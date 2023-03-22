import type { ContextUser } from '~/graphql/types';
import { UserController } from '~/controllers';
import { requireAuth } from './context';

export const queryResolver = {
  me: (_: any, __: any, c: ContextUser) => {
    requireAuth(c);
    return UserController.getSelf(c.user.id);
  },
};

export const mutationResolver = {};
