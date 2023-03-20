import type { User } from '~/shared/types';
import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';

const schema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    vibes: {
      type: [ObjectId],
      required: true,
    },
    comments: {
      type: [ObjectId],
      required: true,
    },
    smiles: {
      type: [ObjectId],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

schema.virtual('id').get((e) => {
  return e?._id;
});

export const UserModel = model<User>('User', schema);
