import { FastifyInstance } from 'fastify';
import { TokenType } from '~/shared/enums';
import { User } from '~/shared/types';

export function tokenPayload(app: FastifyInstance, bodyToken: string) {
  const token = app.jwt.verify(bodyToken);

  const dateNow = Math.floor(Date.now() / 1000);
  if (dateNow >= token['exp']) {
    throw new Error('TOKEN_EXPIRED');
  }

  return token['payload'];
}

export function signedInToken(app: FastifyInstance, user: User) {
  return app.jwt.sign(
    {
      id: user.id,
      type: TokenType.SIGNED_IN,
    },
    { expiresIn: '7d' },
  );
}
