import type { ContextUser } from '~/graphql/types';
import { ObjectId } from 'mongodb';
import { UserController, VibeController } from '~/controllers';
import { requireAuth } from './context';

export const queryResolver = {
  me: (_: any, __: any, c: ContextUser) => {
    requireAuth(c);
    return UserController.getSelf(c.user.id);
  },
};

export const mutationResolver = {
  createVibe: (_: any, i: { message: string }, c: ContextUser) => {
    requireAuth(c);
    return VibeController.create(i.message, c.user.id);
  },

  smile: (_: any, i: { id: ObjectId }, c: ContextUser) => {
    requireAuth(c);
    return VibeController.smile(i.id, c.user.id);
  },

  unsmile: (_: any, i: { id: ObjectId }, c: ContextUser) => {
    requireAuth(c);
    return VibeController.unsmile(i.id, c.user.id);
  },
};
