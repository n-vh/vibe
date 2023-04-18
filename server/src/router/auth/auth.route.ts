import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import type { User } from '~/shared/types';
import { MailVerifyController, UserController } from '~/controllers';
import {
  ForgotPasswordRouteSchema,
  LoginRouteSchema,
  SignUpRouteSchema,
} from './auth.schema';
import { comparePassword, hashPassword } from '~/utils/password';
import { TokenType } from '~/shared/enums';
import { UserModel } from '~/database/models';

type SignUpRouteRequest = FastifyRequest<{
  Body: Pick<User, 'username' | 'email' | 'password'>;
}>;

type LoginRouteRequest = FastifyRequest<{
  Body: Pick<User, 'username' | 'password'>;
}>;

type ForgotPasswordRouteRequest = FastifyRequest<{
  Body: Pick<User, 'email'>;
}>;

export const authRouter: FastifyPluginCallback = (app, opts, next) => {
  app.route({
    url: '/signup',
    method: 'POST',
    schema: SignUpRouteSchema,
    handler: async (req: SignUpRouteRequest, rep) => {
      try {
        const user = await UserModel.findOne({
          $or: [{ email: req.body.email }, { username: req.body.username }],
        });

        if (user) {
          throw new Error(
            user.email === req.body.email
              ? 'EMAIL_ALREADY_USED'
              : 'USERNAME_ALREADY_USED',
          );
        }

        // sends an email with a token
        const token = app.mail.sendSignUp({
          ...req.body,
          password: await hashPassword(req.body.password),
        });

        // save the token in the database
        await MailVerifyController.create({
          token,
          type: TokenType.SIGNUP,
        });

        rep.send({
          status: 200,
          message: 'SIGNUP_TOKEN_SENT',
        });
      } catch (e) {
        rep.status(400).send({
          status: 400,
          error: e.message,
        });
      }
    },
  });

  app.route({
    url: '/login',
    method: 'POST',
    schema: LoginRouteSchema,
    handler: async (req: LoginRouteRequest, rep) => {
      try {
        // if the user doesn't exist, throw an error
        const user = await UserController.findOne({
          username: req.body.username.toLowerCase(),
        });

        const samePassword = await comparePassword(req.body.password, user.password);

        // if the password is wrong, throw an error
        if (!samePassword) {
          throw new Error('WRONG_PASSWORD');
        }

        const token = app.jwt.sign(
          {
            id: user.id,
            username: user.username,
            type: TokenType.SIGNED,
          },
          { expiresIn: '7d' },
        );

        rep.send({ token });
      } catch (e) {
        rep.status(400).send({
          status: 400,
          error: e.message,
        });
      }
    },
  });

  app.route({
    url: '/forgot-password',
    method: 'POST',
    schema: ForgotPasswordRouteSchema,
    handler: async (req: ForgotPasswordRouteRequest, rep) => {
      try {
        // if the user doesn't exist, throw an error
        const user = await UserController.findOne({
          email: req.body.email.toLowerCase(),
        });

        // sends an email with a token
        const token = app.mail.sendForgotPassword({
          email: user.email,
          username: user.username,
        });

        // save the token in the database
        await MailVerifyController.create({
          token,
          type: TokenType.FORGOT_PASSWORD,
        });

        rep.send({
          status: 200,
          message: 'PASSWORD_RESET_TOKEN_SENT',
        });
      } catch (e) {
        rep.status(400).send({
          status: 400,
          error: e.message,
        });
      }
    },
  });

  // TODO password-change route

  next();
};
