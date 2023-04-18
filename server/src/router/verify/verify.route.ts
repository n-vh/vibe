import type { FastifyPluginCallback, FastifyRequest } from 'fastify';
import { MailVerifyController, UserController } from '~/controllers';
import { hashPassword } from '~/utils/password';
import { TokenType } from '~/shared/enums';
import { signedInToken, tokenPayload } from '~/utils/token';
import { VerifyRouteSchema } from './verify.schema';

type VerifyRouteRequest = FastifyRequest<{
  Body: { token: string; password?: string };
}>;

export const verifyRouter: FastifyPluginCallback = (app, opts, next) => {
  app.route({
    url: '/verify',
    method: 'POST',
    schema: VerifyRouteSchema,
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
            token: signedInToken(app, user),
          });
        }

        if (payload.type === TokenType.LOGIN) {
          const user = await UserController.findOne({ email: payload.email });

          rep.send({
            token: signedInToken(app, user),
          });
        }

        if (payload.type === TokenType.FORGOT_PASSWORD) {
          const user = await UserController.findOne({ email: payload.email });

          await user.updateOne({ password: await hashPassword(req.body.password) });

          rep.send({
            token: signedInToken(app, user),
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
