import * as bcrypt from 'bcrypt-ts';

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export const comparePassword = bcrypt.compare;
