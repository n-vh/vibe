import { ObjectId } from 'mongodb';
import { UserModel, VibeModel } from '~/database/models';

export namespace TimelineController {
  export async function home(id: ObjectId, cursor?: ObjectId) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    const LIMIT = 50;

    const query = {
      ...(cursor && { _id: { $lt: cursor } }),
      user: { $in: [user.id, ...user.following] },
    };

    const options = {
      sort: { createdAt: -1 },
      limit: LIMIT,
    };

    const vibes = await VibeModel.find(query, null, options).populate({
      path: 'comments smiles user message createdAt',
      select: 'username avatar',
    });

    return {
      vibes,
      pageInfo: {
        cursor: vibes[vibes.length - 1]?._id || '',
        hasNext: vibes.length === LIMIT,
      },
    };
  }
}
