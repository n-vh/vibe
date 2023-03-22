import type { FilterQuery } from 'mongoose';
import type { User } from '~/shared/types';
import { UserModel } from '~/database/models';
import { GraphQLError } from 'graphql';

export const UserController = {
  async create(user: User) {
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
  },

  async findOne(filter: FilterQuery<User>) {
    const doc = await UserModel.findOne(filter);

    if (!doc) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    return doc;
  },

  async getSelf(filter: FilterQuery<User>) {
    const doc = await UserModel.findOne(filter);

    if (!filter || !doc) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    return {
      username: doc.username,
      email: doc.email,
      avatar: doc.avatar,
    };
  },

  async updateOne(id: string, user: Partial<User>) {
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
  },
};
