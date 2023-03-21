import { ObjectId } from 'mongodb';
import { TokenType } from './enums';

export interface Me {
  id?: ObjectId;
  username: string;
  email: string;
  avatar: string;
}

export interface User extends Me {
  vibes: ObjectId[];
  comments: ObjectId[];
  smiles: ObjectId[];
}

export interface Vibe {
  id?: ObjectId;
  user: ObjectId;
  message: string;
  comments: ObjectId[];
  smiles: number;
  smiled: boolean;
}

export interface IMailVerify {
  id?: ObjectId;
  token: string;
  type: TokenType;
}
