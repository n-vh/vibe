import type { ContextUser, WithId, WithIds } from '~/graphql/types';
import { UserController, VibeController } from '~/controllers';
import { requireAuth } from './context';
import { TimelineController } from '~/controllers/timeline.controller';

export const queryResolver = {
  me: (_: any, __: any, c: ContextUser) => {
    requireAuth(c);
    return UserController.getSelf(c.user.id);
  },

  timeline: (_: any, __: any, c: ContextUser) => {
    requireAuth(c);
    return TimelineController.home(c.user.id);
  },
};

export const mutationResolver = {
  createVibe: (_: any, i: { message: string }, c: ContextUser) => {
    requireAuth(c);
    return VibeController.create(i.message, c.user.id);
  },

  smile: (_: any, i: WithId, c: ContextUser) => {
    requireAuth(c);
    return VibeController.smile(i.id, c.user.id);
  },

  unsmile: (_: any, i: WithId, c: ContextUser) => {
    requireAuth(c);
    return VibeController.unsmile(i.id, c.user.id);
  },
};
