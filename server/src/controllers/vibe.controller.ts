import { GraphQLError } from 'graphql';
import { ObjectId } from 'mongodb';
import { UserModel, VibeModel } from '~/database/models';
import { UserController } from './user.controller';

export namespace VibeController {
  export async function getVibe(vibeId: ObjectId, userId: ObjectId) {
    const vibe = await VibeModel.findById(vibeId).populate('user');

    if (!vibe) {
      throw new GraphQLError('VIBE_NOT_FOUND');
    }

    vibe.smiles.hasSmiled = vibe.smiles.users.includes(userId);

    return vibe;
  }

  export async function getReplies(vibeId: ObjectId, userId: ObjectId) {
    const vibe = await VibeModel.findById(vibeId);

    if (!vibe) {
      throw new GraphQLError('VIBE_NOT_FOUND');
    }

    const vibes = await VibeModel.find({ _id: { $in: vibe.replies.vibes } })
      .sort({ _id: -1 })
      .populate('user');

    return vibes.map((vibe) => {
      vibe.smiles.hasSmiled = vibe.smiles.users.includes(userId);
      return vibe;
    });
  }

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

  export async function deleteOne(vibeId: ObjectId, userId: ObjectId) {
    const vibe = await VibeModel.findOne({ _id: vibeId, user: userId });

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
            $in: [...vibe.replies.vibes, ...vibe.smiles.users],
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

  export async function smileVibe(vibeId: ObjectId, userId: ObjectId) {
    const vibe = await VibeModel.findOne({
      $and: [{ _id: vibeId }, { 'smiles.users': { $nin: [userId] } }],
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

  export async function unsmileVibe(vibeId: ObjectId, userId: ObjectId) {
    const vibe = await VibeModel.findOne({
      $and: [{ _id: vibeId }, { 'smiles.users': { $in: [userId] } }],
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

  export async function replyVibe(vibeId: ObjectId, userId: ObjectId, message: string) {
    const vibe = await VibeModel.findOne({
      $and: [{ _id: vibeId }, { 'replies.vibes': { $nin: [vibeId] } }],
    });

    if (!vibe) {
      throw new GraphQLError('VIBE_NOT_FOUND');
    }

    const reply = await VibeController.createOne(message, userId, vibe._id);

    await Promise.allSettled([
      vibe.updateOne({
        $inc: {
          'replies.count': 1,
        },
        $addToSet: {
          'replies.vibes': reply._id,
        },
      }),
      UserController.push(userId, 'replies', reply._id),
    ]);

    return vibe;
  }
}
