import type { ContextUser } from '~/graphql/types';
import { UserController } from '~/controllers';

export const queryResolver = {
  me: (_: any, __: any, c: ContextUser) => {
    return UserController.getSelf(c.user?.id);
  },
};

export const mutationResolver = {};
