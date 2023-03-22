import type { FilterQuery } from 'mongoose';
import type { User } from '~/shared/types';
import { ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { UserModel } from '~/database/models';

export namespace UserController {
  export async function create(user: User) {
    const doc = await UserModel.findOne({
      email: user.email.toLowerCase(),
    });

    if (doc) {
      throw new GraphQLError('USER_ALREADY_EXISTS');
    }

    return await UserModel.create({
      avatar: 'https://i.pravatar.cc/150',
      ...user,
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

  export async function push(id: ObjectId, field: string, value: ObjectId) {
    const document = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $push: { [field]: value } },
      { new: true },
    );

    if (!document) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    return document;
  }

  export async function pull(id: ObjectId, field: string, value: ObjectId) {
    const document = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $pull: { [field]: value } },
      { new: true },
    );

    if (!document) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    return document;
  }
}
