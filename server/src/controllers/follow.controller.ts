import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';
import { UserController } from './user.controller';

export namespace FollowController {
  export async function follow(id: ObjectId, userId: ObjectId) {
    const user = await UserController.findOne({
      $and: [{ _id: id }, { followers: { $nin: [userId] } }],
    });

    if (!user) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    await user.updateOne({
      $addToSet: {
        followers: userId,
      },
    });

    await UserController.push(userId, 'following', user._id);

    return user;
  }

  export async function unfollow(id: ObjectId, userId: ObjectId) {
    const user = await UserController.findOne({
      $and: [{ _id: id }, { followers: { $in: [userId] } }],
    });

    if (!user) {
      throw new GraphQLError('USER_NOT_FOUND');
    }

    await user.updateOne({
      $pull: {
        followers: userId,
      },
    });

    await UserController.pull(userId, 'following', user._id);

    return user;
  }
}
