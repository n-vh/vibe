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
      sort: { _id: -1 },
      limit: LIMIT,
    };

    const vibes = await VibeModel.find(query, null, options).populate({
      path: 'replies smiles user message createdAt',
      select: 'username avatar',
    });

    return {
      vibes: vibes.map((vibe) => ({
        ...vibe.toObject(),
        id: vibe._id,
        smiles: {
          ...vibe.smiles,
          hasSmiled: vibe.smiles.users.includes(id),
        },
      })),
      pageInfo: {
        cursor: vibes.at(-1)?._id || '',
        hasNext: vibes.length === LIMIT,
      },
    };
  }
}
