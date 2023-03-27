import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';
import { UserModel, VibeModel } from '~/database/models';
import { UserController } from './user.controller';

export namespace VibeController {
  export async function createOne(
    message: string,
    userId: ObjectId,
    reply: ObjectId = null,
  ) {
    const vibe = await VibeModel.create({
      user: userId,
      message,
      reply,
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
      VibeModel.deleteMany({
        reply: vibe._id,
      }),
      VibeModel.updateOne(
        {
          _id: vibe.reply,
        },
        {
          $inc: {
            'replies.count': -1,
          },
          $pull: {
            'replies.vibes': vibe._id,
          },
        },
      ),
      UserModel.updateMany(
        {
          _id: {
            $in: [...vibe.replies.users, ...vibe.smiles.users],
          },
        },
        {
          $pull: {
            replies: vibe._id,
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
            replies: vibe._id,
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

  export async function replyVibe(id: ObjectId, userId: ObjectId, message: string) {
    const vibe = await VibeModel.findOne({
      $and: [{ _id: id }, { 'replies.vibes': { $nin: [id] } }],
    });

    if (!vibe) {
      throw new GraphQLError('VIBE_NOT_FOUND');
    }

    await Promise.allSettled([
      vibe.updateOne({
        $inc: {
          'replies.count': 1,
        },
        $addToSet: {
          'replies.vibes': vibe._id,
        },
      }),
      UserController.push(userId, 'replies', vibe._id),
      VibeController.createOne(message, userId, vibe._id),
    ]);

    return vibe;
  }
}
