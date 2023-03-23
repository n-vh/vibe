import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';
import { VibeModel } from '~/database/models';
import { UserController } from './user.controller';

export namespace VibeController {
  export async function create(message: string, userId: ObjectId) {
    const vibe = await VibeModel.create({
      user: userId,
      message,
    });

    await UserController.push(userId, 'vibes', vibe._id);

    return vibe;
  }

  export async function smile(id: ObjectId, userId: ObjectId) {
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

  export async function unsmile(id: ObjectId, userId: ObjectId) {
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
