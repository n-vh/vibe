import type { ContextUser, WithId } from '~/graphql/types';
import { VibeType } from '~/graphql/types';
import { ObjectId } from 'mongodb';
import { TimelineController, UserController, VibeController } from '~/controllers';
import { FollowController } from '~/controllers';
import { Me } from '~/shared/types';

export const queryResolver = {
  comments: (_: any, v: WithId, c: ContextUser) => {
    return VibeController.comments(v.id, c.user.id);
  },

  friends: (_: any, __: any, c: ContextUser) => {
    return UserController.friends(c.user.id);
  },

  followers: (_: any, v: WithId) => {
    return FollowController.followers(v.id);
  },

  following: (_: any, v: WithId) => {
    return FollowController.following(v.id);
  },

  me: (_: any, __: any, c: ContextUser) => {
    return UserController.getSelf(c.user.id);
  },

  timeline: (_: any, v: { after?: ObjectId }, c: ContextUser) => {
    return TimelineController.home(c.user.id, v.after);
  },

  vibe: (_: any, v: WithId, c: ContextUser) => {
    return VibeController.getVibe(v.id, c.user.id);
  },

  vibes: (_: any, v: { id: ObjectId; type: VibeType }, c: ContextUser) => {
    switch (v.type) {
      case VibeType.VIBES:
        return UserController.getVibes(v.id, c.user.id);
      case VibeType.COMMENTS:
        return UserController.comments(v.id, c.user.id);
      case VibeType.SMILES:
        return UserController.getSmiles(v.id, c.user.id);
    }
  },

  user: (_: any, v: { id?: ObjectId; username?: string }, c: ContextUser) => {
    if (v.id) {
      return UserController.findOne({ _id: v.id });
    }
    if (v.username) {
      return UserController.findOne({ username: v.username.toLowerCase() });
    }
    return null;
  },

  users: (_: any, v: { query: string }, c: ContextUser) => {
    return UserController.users(v.query);
  },
};

export const mutationResolver = {
  addComment: (_: any, i: { id: ObjectId; message: string }, c: ContextUser) => {
    return VibeController.addComment(i.id, c.user.id, i.message);
  },

  addFollow: (_: any, i: WithId, c: ContextUser) => {
    return FollowController.addFollow(i.id, c.user.id);
  },

  addSmile: (_: any, i: WithId, c: ContextUser) => {
    return VibeController.addSmile(i.id, c.user.id);
  },

  createVibe: (_: any, i: { message: string }, c: ContextUser) => {
    return VibeController.createOne(i.message, c.user.id);
  },

  deleteVibe: (_: any, i: WithId, c: ContextUser) => {
    return VibeController.deleteOne(i.id, c.user.id);
  },

  modifySettings: (_: any, i: { input: Partial<Me> }, c: ContextUser) => {
    return UserController.modifySettings(i.input, c.user.id);
  },

  removeFollow: (_: any, i: WithId, c: ContextUser) => {
    return FollowController.removeFollow(i.id, c.user.id);
  },

  removeSmile: (_: any, i: WithId, c: ContextUser) => {
    return VibeController.removeSmile(i.id, c.user.id);
  },
};
