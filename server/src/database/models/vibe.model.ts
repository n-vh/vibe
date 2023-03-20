import { model, Schema } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Vibe } from '~/shared/types';

const schema = new Schema<Vibe>(
  {
    user: {
      type: ObjectId,
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
        required: true,
      },
      items: {
        type: [ObjectId],
        required: true,
      },
    },
    smiles: {
      type: Number,
      required: true,
    },
    smiled: {
      type: Boolean,
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

export const VibeModel = model<Vibe>('Vibe', schema);
