import { ObjectId } from 'mongodb';
import { TokenType } from './enums';

export interface Me {
  id: ObjectId;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface ReplyNode {
  count: number;
  hasReplied: boolean;
  vibes: ObjectId[];
}

export interface SmileNode {
  count: number;
  hasSmiled: boolean;
  users: ObjectId[];
}

export interface User extends Me {
  vibes: ObjectId[];
  replies: ObjectId[];
  smiles: ObjectId[];
  followers: ObjectId[];
  following: ObjectId[];
}

export interface Vibe {
  id: ObjectId;
  user: ObjectId;
  message: string;
  replies: ReplyNode;
  smiles: SmileNode;
  reply: ObjectId;
}

export interface IMailVerify {
  id?: ObjectId;
  token: string;
  type: TokenType;
}
