import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';
import { UserModel, VibeModel } from '~/database/models';
import { UserController } from './user.controller';

export namespace VibeController {
  export async function createOne(message: string, userId: ObjectId) {
    const vibe = await VibeModel.create({
      user: userId,
      message,
    });

    await UserController.push(userId, 'vibes', vibe._id);

    return vibe;
  }

  export async function deleteOne(id: ObjectId, userId: ObjectId) {
    const vibe = await VibeModel.findOne({ _id: id, user: userId });

    if (!vibe) {
      throw new GraphQLError('VIBE_NOT_FOUND');
    }

    await Promise.allSettled([
      vibe.deleteOne(),
      UserModel.updateMany(
        {
          _id: {
            $in: [...vibe.comments.users, ...vibe.smiles.users],
          },
        },
        {
          $pull: {
            comments: vibe._id,
            smiles: vibe._id,
          },
        },
      ),
      UserModel.updateOne(
        {
          _id: userId,
        },
        {
          $pull: {
            comments: vibe._id,
            vibes: vibe._id,
            smiles: vibe._id,
          },
        },
      ),
    ]);

    return vibe;
  }

  export async function smileVibe(id: ObjectId, userId: ObjectId) {
    const vibe = await VibeModel.findOne({
      $and: [{ _id: id }, { 'smiles.users': { $nin: [userId] } }],
    });

    if (!vibe) {
      throw new GraphQLError('VIBE_NOT_FOUND');
    }

    await vibe.updateOne({
      $inc: {
        'smiles.count': 1,
      },
      $addToSet: {
        'smiles.users': userId,
      },
    });

    await UserController.push(userId, 'smiles', vibe._id);

    return vibe;
  }

  export async function unsmileVibe(id: ObjectId, userId: ObjectId) {
    const vibe = await VibeModel.findOne({
      $and: [{ _id: id }, { 'smiles.users': { $in: [userId] } }],
    });

    if (!vibe) {
      throw new GraphQLError('VIBE_NOT_FOUND');
    }

    await vibe.updateOne({
      $inc: {
        'smiles.count': -1,
      },
      $pull: {
        'smiles.users': userId,
      },
    });

    await UserController.pull(userId, 'smiles', vibe._id);

    return vibe;
  }
}
