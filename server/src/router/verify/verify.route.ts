import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { MailVerifyController, UserController } from '~/controllers';
import { hashPassword } from '~/utils/password';
import { TokenType } from '~/shared/enums';
import { tokenPayload } from '~/utils/token';

type VerifyRouteRequest = FastifyRequest<{
  Body: { token: string; password?: string };
}>;

export const verifyRouter: FastifyPluginCallback = (app, opts, next) => {
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

        if (payload.type === TokenType.FORGOT_PASSWORD) {
          const user = await UserController.findOne({ email: payload.email });

          user.updateOne({ password: await hashPassword(req.body.password) });

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

  next();
};
