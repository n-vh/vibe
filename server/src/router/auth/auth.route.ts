import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import type { User } from '~/shared/types';
import { MailVerifyController, UserController } from '~/controllers';
import { RouteSchema } from './auth.schema';
import { comparePassword } from '~/utils/password';
import { TokenType } from '~/shared/enums';
import { UserModel } from '~/database/models';
import { tokenPayload } from '~/utils/token';

type SignUpRouteRequest = FastifyRequest<{
  Body: Pick<User, 'username' | 'email'>;
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
                email: user.email,
                avatar: user.avatar,
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
        const token = app.mail.sendSignUp(req.body);

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
    schema: RouteSchema,
    handler: async (req: SignUpRouteRequest, rep) => {
      try {
        // if the user doesn't exist, throw an error
        const user = await UserController.findOne({
          username: req.body.username.toLowerCase(),
          email: req.body.email.toLowerCase(),
        });

        const token = app.mail.sendLogin({
          email: user.email,
          username: user.username,
        });

        await MailVerifyController.create({
          token,
          type: TokenType.LOGIN,
        });

        rep.send({
          status: 200,
          message: 'LOGIN_TOKEN_SENT',
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
