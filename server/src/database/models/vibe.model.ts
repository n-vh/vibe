import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Vibe } from '~/shared/types';

const Node = {
  count: {
    type: Number,
    default: 0,
  },
  users: [
    {
      type: ObjectId,
      ref: 'User',
      default: [],
    },
  ],
};

const schema = new Schema<Vibe>(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    comments: Node,
    smiles: Node,
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

schema.virtual('id').get((e) => {
  return e?._id;
});

export const VibeModel = model<Vibe>('Vibe', schema);
