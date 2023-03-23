import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import type { User } from '~/shared/types';
import { MailVerifyController, UserController } from '~/controllers';
import { ForgotPasswordRouteSchema, LoginRouteSchema, RouteSchema } from './auth.schema';
import { comparePassword, hashPassword } from '~/utils/password';
import { TokenType } from '~/shared/enums';
import { UserModel } from '~/database/models';
import { tokenPayload } from '~/utils/token';

type SignUpRouteRequest = FastifyRequest<{
  Body: Pick<User, 'username' | 'email' | 'password'>;
}>;

type LoginRouteRequest = FastifyRequest<{
  Body: Pick<User, 'username' | 'password'>;
}>;

type ForgotPasswordRouteRequest = FastifyRequest<{
  Body: Pick<User, 'email'>;
}>;

type VerifyRouteRequest = FastifyRequest<{
  Body: { token: string };
}>;

export const authRouter: FastifyPluginCallback = (app, opts, next) => {
  app.route({
    url: '/verify',
    method: 'POST',
    handler: async (req: VerifyRouteRequest, rep) => {
      try {
        const payload = tokenPayload(app, req.body.token);

        // delete the mail verify token
        // throws error if token is not found
        await MailVerifyController.deleteOne(req.body);

        if (payload.type === TokenType.SIGNUP) {
          // create the user
          // throws error if user already exists
          const user = await UserController.create(payload);

          rep.send({
            token: app.jwt.sign(
              {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                type: TokenType.SIGNED,
              },
              { expiresIn: '7d' },
            ),
          });
        }

        if (payload.type === TokenType.LOGIN) {
          const user = await UserController.findOne({ email: payload.email });

          rep.send({
            token: app.jwt.sign(
              {
                id: user.id,
                username: user.username,
                type: TokenType.SIGNED,
              },
              { expiresIn: '7d' },
            ),
          });
        }
      } catch (e) {
        rep.status(400).send({
          status: 400,
          error: e.message,
        });
      }
    },
  });

  app.route({
    url: '/signup',
    method: 'POST',
    schema: RouteSchema,
    handler: async (req: SignUpRouteRequest, rep) => {
      try {
        const user = await UserModel.findOne({
          $or: [{ email: req.body.email }, { username: req.body.username }],
        });

        if (user) {
          if (user.email === req.body.email) {
            throw new Error('EMAIL_ALREADY_USED');
          } else {
            throw new Error('USERNAME_ALREADY_USED');
          }
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
        const token = app.mail.sendForgotPassword(req.body);

        // save the token in the database
        await MailVerifyController.create({
          token,
          type: TokenType.FORGOT_PASSWORD,
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
