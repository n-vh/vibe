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
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    vibes: [
      {
        type: ObjectId,
        ref: 'Vibe',
        default: [],
      },
    ],
    comments: [
      {
        type: ObjectId,
        ref: 'Vibe',
        default: [],
      },
    ],
    smiles: [
      {
        type: ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    followers: [
      {
        type: ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: 'User',
        default: [],
      },
    ],
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
