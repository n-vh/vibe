import { ObjectId } from "mongodb";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ObjectID: ObjectId;
};

export type Me = {
  __typename?: 'Me';
  avatar: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ObjectID'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createVibe?: Maybe<Vibe>;
  follow?: Maybe<User>;
  smile?: Maybe<Vibe>;
  unfollow?: Maybe<User>;
  unsmile?: Maybe<Vibe>;
};


export type MutationCreateVibeArgs = {
  message: Scalars['String'];
};


export type MutationFollowArgs = {
  id: Scalars['ObjectID'];
};


export type MutationSmileArgs = {
  id: Scalars['ObjectID'];
};


export type MutationUnfollowArgs = {
  id: Scalars['ObjectID'];
};


export type MutationUnsmileArgs = {
  id: Scalars['ObjectID'];
};

export type Node = {
  __typename?: 'Node';
  count: Scalars['Int'];
  users: Array<Scalars['ObjectID']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  cursor: Scalars['String'];
  hasNext: Scalars['Boolean'];
};

export type PaginatedVibes = {
  __typename?: 'PaginatedVibes';
  pageInfo: PageInfo;
  vibes: Array<Vibe>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Me>;
  timeline?: Maybe<PaginatedVibes>;
  user?: Maybe<User>;
  vibe?: Maybe<Vibe>;
};


export type QueryTimelineArgs = {
  after?: InputMaybe<Scalars['ObjectID']>;
};


export type QueryUserArgs = {
  id: Scalars['ObjectID'];
};


export type QueryVibeArgs = {
  id: Scalars['ObjectID'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  comments: Array<Scalars['ObjectID']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers: Array<Scalars['ObjectID']>;
  following: Array<Scalars['ObjectID']>;
  id: Scalars['ObjectID'];
  smiles: Array<Scalars['ObjectID']>;
  username: Scalars['String'];
  vibes: Array<Scalars['ObjectID']>;
};

export type Vibe = {
  __typename?: 'Vibe';
  comments: Node;
  createdAt: Scalars['String'];
  id: Scalars['ObjectID'];
  message: Scalars['String'];
  smiles: Node;
  user: User;
};
