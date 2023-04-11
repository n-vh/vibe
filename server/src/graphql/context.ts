import type { ApolloFastifyContextFunction } from '@as-integrations/fastify';
import type { ContextUser } from './types';
import { UserController } from '~/controllers';
import { GraphQLError } from 'graphql';

type Context = ApolloFastifyContextFunction<ContextUser>;

export const AuthContext: Context = async (req, rep) => {
  try {
    const token = await req.jwtVerify<{ id: string }>();
    const user = await UserController.findOne({ _id: token.id });
    return {
      user: user,
    };
  } catch {
    throw new GraphQLError('UNAUTHORIZED');
  }
};
