import type { ContextUser, WithId } from '~/graphql/types';
import { ObjectId } from 'mongodb';
import { TimelineController, UserController, VibeController } from '~/controllers';
import { FollowController } from '~/controllers';
import { requireAuth } from './context';

export const queryResolver = {
  me: (_: any, __: any, c: ContextUser) => {
    requireAuth(c);
    return UserController.getSelf(c.user.id);
  },

  user: (_: any, v: { id?: ObjectId; username?: string }, c: ContextUser) => {
    requireAuth(c);
    if (v.id) {
      return UserController.findOne({ _id: v.id });
    }
    if (v.username) {
      return UserController.findOne({ username: v.username.toLowerCase() });
    }
    return null;
  },

  timeline: (_: any, v: { after?: ObjectId }, c: ContextUser) => {
    requireAuth(c);
    return TimelineController.home(c.user.id, v.after);
  },
};

export const mutationResolver = {
  createVibe: (_: any, i: { message: string }, c: ContextUser) => {
    requireAuth(c);
    return VibeController.createOne(i.message, c.user.id);
  },

  deleteVibe: (_: any, i: WithId, c: ContextUser) => {
    requireAuth(c);
    return VibeController.deleteOne(i.id, c.user.id);
  },

  smileVibe: (_: any, i: WithId, c: ContextUser) => {
    requireAuth(c);
    return VibeController.smileVibe(i.id, c.user.id);
  },

  unsmileVibe: (_: any, i: WithId, c: ContextUser) => {
    requireAuth(c);
    return VibeController.unsmileVibe(i.id, c.user.id);
  },

  replyVibe: (_: any, i: { id: ObjectId; message: string }, c: ContextUser) => {
    requireAuth(c);
    return VibeController.replyVibe(i.id, c.user.id, i.message);
  },

  follow: (_: any, i: WithId, c: ContextUser) => {
    requireAuth(c);
    return FollowController.follow(i.id, c.user.id);
  },

  unfollow: (_: any, i: WithId, c: ContextUser) => {
    requireAuth(c);
    return FollowController.unfollow(i.id, c.user.id);
  },
};
