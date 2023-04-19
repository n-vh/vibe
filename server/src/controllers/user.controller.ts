import type { FilterQuery } from 'mongoose';
import type { Me, User } from '~/shared/types';
import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { UserModel, VibeModel } from '~/database/models';
import { randomInArray } from '~/utils/random';
import { avatars } from '~/shared/constants';
import { comparePassword, hashPassword } from '~/utils/password';

export namespace UserController {
  export async function create(user: User) {
    const doc = await UserModel.findOne({
      email: user.email.toLowerCase(),
    });

    if (doc) {
      throw new GraphQLError('USER_ALREADY_EXISTS');
    }

    return await UserModel.create({
      ...user,
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      avatar: randomInArray(avatars),
    });
  }

  export async function findOne(filter: FilterQuery<User>) {
    const doc = await UserModel.findOne(filter);

    if (!doc) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    return doc;
  }

  export async function users(query: string) {
    return UserModel.find({
      username: { $regex: query, $options: 'i' },
    }).limit(5);
  }

  export async function getSelf(userId: ObjectId) {
    const doc = await UserModel.findById(userId);

    if (!doc) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    return {
      id: doc._id,
      username: doc.username,
      email: doc.email,
      avatar: doc.avatar,
    };
  }

  export async function updateOne(userId: ObjectId, user: Partial<User>) {
    const document = await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { $set: user },
      { new: true },
    );

    if (!document) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    return document;
  }

  export async function modifyArray(
    userId: ObjectId,
    operation: '$addToSet' | '$pull',
    field: string,
    value: ObjectId,
  ) {
    const document = await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      { [operation]: { [field]: value } },
      { new: true },
    );

    if (!document) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    return document;
  }

  export function push(userId: ObjectId, field: string, value: ObjectId) {
    return UserController.modifyArray(userId, '$addToSet', field, value);
  }

  export function pull(userId: ObjectId, field: string, value: ObjectId) {
    return UserController.modifyArray(userId, '$pull', field, value);
  }

  export async function getVibes(userId: ObjectId, selfId: ObjectId) {
    const user = await UserController.findOne({ _id: userId });
    const vibes = await VibeModel.find({ _id: { $in: user.vibes }, reply: null })
      .sort({ _id: -1 })
      .populate('user');

    return vibes.map((vibe) => {
      vibe.smiles.hasSmiled = vibe.smiles.users.includes(selfId);
      return vibe;
    });
  }

  export async function comments(userId: ObjectId, selfId: ObjectId) {
    const user = await UserController.findOne({ _id: userId });
    const vibes = await VibeModel.find({ _id: { $in: user.replies } })
      .sort({ _id: -1 })
      .populate({
        path: 'user reply',
        populate: {
          path: 'user',
          strictPopulate: false,
        },
        strictPopulate: false,
      });

    return vibes.map((vibe) => {
      vibe.smiles.hasSmiled = vibe.smiles.users.includes(selfId);
      return vibe;
    });
  }

  export async function getSmiles(userId: ObjectId, selfId: ObjectId) {
    const user = await UserController.findOne({ _id: userId });
    const vibes = await VibeModel.find({ _id: { $in: user.smiles } }, null, { _id: -1 })
      .sort({ _id: -1 })
      .populate('user');

    return vibes.map((vibe) => {
      vibe.smiles.hasSmiled = vibe.smiles.users.includes(selfId);
      return vibe;
    });
  }

  export async function modifySettings(payload: Partial<Me>, selfId: ObjectId) {
    const user = await UserController.findOne({ _id: selfId });

    if (payload.avatar) {
      if (user.avatar !== payload.avatar) {
        return await UserController.updateOne(selfId, { avatar: payload.avatar });
      } else {
        throw new GraphQLError('SAME_AVATAR');
      }
    }

    if (payload.email) {
      if (user.email !== payload.email) {
        return await UserController.updateOne(selfId, { email: payload.email });
      } else {
        throw new GraphQLError('SAME_EMAIL');
      }
    }

    if (payload.password) {
      const isSamePassword = await comparePassword(payload.password, user.password);
      const newPasswordHashed = await hashPassword(payload.password);

      if (!isSamePassword) {
        return await UserController.updateOne(selfId, { password: newPasswordHashed });
      } else {
        throw new GraphQLError('SAME_PASSWORD');
      }
    }
  }

  export async function friends(selfId: ObjectId) {
    const user = await UserController.findOne({ _id: selfId });
    const followers = await UserModel.find({ _id: { $in: user.followers } });
    return followers
      .filter((follower) => user.following.includes(follower._id))
      .slice(0, 5);
  }
}
