import type { IMailVerify } from '~/shared/types';
import { model, Schema } from 'mongoose';

const schema = new Schema<IMailVerify>(
  {
    token: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

schema.virtual('id').get((e) => {
  return e?._id;
});

export const MailVerifyModel = model<IMailVerify>('MailVerify', schema);
