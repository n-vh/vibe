import { ObjectId } from 'mongodb';
import { TokenType } from './enums';

export interface Me {
  id: ObjectId;
  username: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Node {
  count: number;
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
  replies: Node;
  smiles: Node;
  reply: ObjectId;
}

export interface IMailVerify {
  id?: ObjectId;
  token: string;
  type: TokenType;
}
