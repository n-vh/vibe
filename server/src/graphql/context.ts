import type { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import type { ContextUser } from './types';
import { UserController } from '~/controllers';

type Context = ApolloFastifyContextFunction<ContextUser>;

export const AuthContext: Context = async (req, rep) => {
  try {
    const token = await req.jwtVerify();
    const user = await UserController.findOne({ _id: token['payload'].id });
    return {
      user: user,
    };
  } catch {
    return {
      user: null,
    };
  }
};
