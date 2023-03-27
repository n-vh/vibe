import type { FilterQuery } from 'mongoose';
import type { User } from '~/shared/types';
import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { UserModel, VibeModel } from '~/database/models';
import { randomInArray } from '~/utils/random';
import { avatars } from '~/shared/constants';

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

  export async function updateOne(id: ObjectId, user: Partial<User>) {
    const document = await UserModel.findOneAndUpdate(
      {
        _id: id,
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
    id: ObjectId,
    operation: '$addToSet' | '$pull',
    field: string,
    value: ObjectId,
  ) {
    const document = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      { [operation]: { [field]: value } },
      { new: true },
    );

    if (!document) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    return document;
  }

  export function push(id: ObjectId, field: string, value: ObjectId) {
    return UserController.modifyArray(id, '$addToSet', field, value);
  }

  export function pull(id: ObjectId, field: string, value: ObjectId) {
    return UserController.modifyArray(id, '$pull', field, value);
  }

  export async function getVibes(id: ObjectId) {
    const user = await UserController.findOne({ _id: id });
    return VibeModel.find({ _id: { $in: user.vibes } })
      .sort({ _id: -1 })
      .populate('user');
  }

  export async function getReplies(id: ObjectId) {
    const user = await UserController.findOne({ _id: id });
    return VibeModel.find({ _id: { $in: user.replies } })
      .sort({ _id: -1 })
      .populate('user');
  }

  export async function getSmiles(id: ObjectId) {
    const user = await UserController.findOne({ _id: id });
    return VibeModel.find({ _id: { $in: user.smiles } }, null, { _id: -1 })
      .sort({ _id: -1 })
      .populate('user');
  }
}
