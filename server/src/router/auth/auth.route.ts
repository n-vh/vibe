import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import type { User } from '~/shared/types';
import { MailVerifyController, UserController } from '~/controllers';
import { RouteSchema } from './auth.schema';
import { comparePassword } from '~/utils/password';
import { MailVerifyType } from '~/shared/enums';
import { UserModel } from '~/database/models';
import { tokenPayload } from '~/utils/token';

type SignUpRouteRequest = FastifyRequest<{
  Body: Pick<User, 'username' | 'email'>;
}>;

type SignUpRouteVerifyRequest = FastifyRequest<{
  Body: { token: string };
}>;

export const authRouter: FastifyPluginCallback = (app, opts, next) => {
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
        const token = app.mail.sendSignUp(req.body);

        // save the token in the database
        await MailVerifyController.create({
          token,
          type: MailVerifyType.SIGNUP,
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
    url: '/signup/verify',
    method: 'POST',
    handler: async (req: SignUpRouteVerifyRequest, rep) => {
      try {
        const user = tokenPayload(app, req.body.token);

        // delete the mail verify token
        // throws error if token is not found
        // await MailVerifyController.deleteOne(req.body);

        console.log(user);

        // create the user
        // throws error if user already exists
        await UserController.create(user);

        rep.send({
          status: 200,
          message: 'SIGNUP_SUCCESS',
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
    url: '/signin',
    method: 'POST',
    schema: RouteSchema,
    handler: async (req: SignUpRouteRequest, rep) => {
      try {
        // if the user doesn't exist, throw an error
        const user = await UserController.findOne({
          email: req.body.email.toLowerCase(),
        });

        const isPasswordValid = await comparePassword(req.body.password, user.password);

        // if the hashed password is invalid, throw an error
        if (!isPasswordValid) {
          throw new Error('INVALID_CREDENTIALS');
        }

        // if the user exists, send a Bearer token
        rep.send({
          token: app.jwt.sign({ payload: user.toJSON() }, { expiresIn: '7d' }),
        });
      } catch (e) {
        rep.status(400).send({
          status: 400,
          error: e.message,
        });
      }
    },
  });

  next();
};
