import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Vibe } from '~/shared/types';

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
    comments: {
      count: {
        type: Number,
        default: 0,
      },
      hasCommented: {
        type: Boolean,
        default: false,
      },
      users: [
        {
          type: ObjectId,
          ref: 'Vibe',
          default: [],
        },
      ],
    },
    smiles: {
      count: {
        type: Number,
        default: 0,
      },
      hasSmiled: {
        type: Boolean,
        default: false,
      },
      users: [
        {
          type: ObjectId,
          ref: 'User',
          default: [],
        },
      ],
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

export const VibeModel = model<Vibe>('Vibe', schema);
