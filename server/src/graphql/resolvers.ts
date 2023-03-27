import type { ContextUser, WithId } from '~/graphql/types';
import { ObjectId } from 'mongodb';
import { TimelineController, UserController, VibeController } from '~/controllers';
import { FollowController } from '~/controllers';

export const queryResolver = {
  me: (_: any, __: any, c: ContextUser) => {
    return UserController.getSelf(c.user.id);
  },

  timeline: (_: any, v: { after?: ObjectId }, c: ContextUser) => {
    return TimelineController.home(c.user.id, v.after);
  },
};

export const mutationResolver = {
  createVibe: (_: any, i: { message: string }, c: ContextUser) => {
    return VibeController.createOne(i.message, c.user.id);
  },

  deleteVibe: (_: any, i: WithId, c: ContextUser) => {
    return VibeController.deleteOne(i.id, c.user.id);
  },

  smile: (_: any, i: WithId, c: ContextUser) => {
    return VibeController.smile(i.id, c.user.id);
  },

  unsmile: (_: any, i: WithId, c: ContextUser) => {
    return VibeController.unsmile(i.id, c.user.id);
  },

  follow: (_: any, i: WithId, c: ContextUser) => {
    return FollowController.follow(i.id, c.user.id);
  },

  unfollow: (_: any, i: WithId, c: ContextUser) => {
    return FollowController.unfollow(i.id, c.user.id);
  },
};
