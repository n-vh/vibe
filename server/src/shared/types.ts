import { ObjectId } from 'mongodb';
import { TokenType } from './enums';

export interface Me {
  id: ObjectId;
  username: string;
  email: string;
  avatar: string;
}

export interface Node {
  count: number;
  users: ObjectId[];
}

export interface User extends Me {
  vibes: ObjectId[];
  comments: ObjectId[];
  smiles: ObjectId[];
  followers: ObjectId[];
  following: ObjectId[];
}

export interface Vibe {
  id: ObjectId;
  user: ObjectId;
  message: string;
  comments: Node;
  smiles: Node;
}

export interface IMailVerify {
  id?: ObjectId;
  token: string;
  type: TokenType;
}
