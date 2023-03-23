import { ObjectId } from 'mongodb';
import { UserModel, VibeModel } from '~/database/models';

export namespace TimelineController {
  export async function home(id: ObjectId) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    return await VibeModel.find({ user: { $in: user.following } }, null, {
      sort: { createdAt: -1 },
    }).populate({
      path: 'comments smiles user message createdAt',
      select: 'username avatar',
    });
    // TODO LIMIT PAGINATION
    // .limit(50);
  }
}
