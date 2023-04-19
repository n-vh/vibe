import type { IMailVerify } from '~/shared/types';
import { FilterQuery } from 'mongoose';
import { MailVerifyModel } from '~/database/models';

export namespace MailVerifyController {
  export async function create(data: IMailVerify) {
    const doc = await MailVerifyModel.findOne({
      token: data.token,
    });

    if (doc) {
      throw new Error('TOKEN_ALREADY_EXISTS');
    }

    return await MailVerifyModel.create(data);
  }

  export async function findOne(filter: FilterQuery<IMailVerify>) {
    const doc = await MailVerifyModel.findOne(filter);

    if (!doc) {
      throw new Error('VERIFY_MAIL_NOT_FOUND');
    }

    return doc;
  }

  export async function deleteOne(filter: FilterQuery<IMailVerify>) {
    const doc = await MailVerifyModel.findOneAndDelete(filter);

    if (!doc) {
      throw new Error('VERIFY_MAIL_NOT_FOUND');
    }

    return doc;
  }
}
//
