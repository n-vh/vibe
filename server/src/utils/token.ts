import { FastifyInstance } from 'fastify';

export function tokenPayload(app: FastifyInstance, bodyToken: string) {
  const token = app.jwt.verify(bodyToken);

  const dateNow = Math.floor(Date.now() / 1000);
  if (dateNow >= token['exp']) {
    throw new Error('TOKEN_EXPIRED');
  }

  return token['payload'];
}
