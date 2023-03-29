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
  deleteVibe?: Maybe<Vibe>;
  follow?: Maybe<User>;
  replyVibe?: Maybe<Vibe>;
  smileVibe?: Maybe<Vibe>;
  unfollow?: Maybe<User>;
  unsmileVibe?: Maybe<Vibe>;
};


export type MutationCreateVibeArgs = {
  message: Scalars['String'];
};


export type MutationDeleteVibeArgs = {
  id: Scalars['ObjectID'];
};


export type MutationFollowArgs = {
  id: Scalars['ObjectID'];
};


export type MutationReplyVibeArgs = {
  id: Scalars['ObjectID'];
  message: Scalars['String'];
};


export type MutationSmileVibeArgs = {
  id: Scalars['ObjectID'];
};


export type MutationUnfollowArgs = {
  id: Scalars['ObjectID'];
};


export type MutationUnsmileVibeArgs = {
  id: Scalars['ObjectID'];
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
  searchUsers: Array<User>;
  timeline?: Maybe<PaginatedVibes>;
  user?: Maybe<User>;
  vibe?: Maybe<Vibe>;
  vibeReplies: Array<Vibe>;
  vibes: Array<Vibe>;
};


export type QuerySearchUsersArgs = {
  query: Scalars['String'];
};


export type QueryTimelineArgs = {
  after?: InputMaybe<Scalars['ObjectID']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ObjectID']>;
  username?: InputMaybe<Scalars['String']>;
};


export type QueryVibeArgs = {
  id: Scalars['ObjectID'];
};


export type QueryVibeRepliesArgs = {
  id: Scalars['ObjectID'];
};


export type QueryVibesArgs = {
  id: Scalars['ObjectID'];
  type: VibeType;
};

export type RepliesNode = {
  __typename?: 'RepliesNode';
  count: Scalars['Int'];
  hasReplied: Scalars['Boolean'];
  vibes: Array<Scalars['ObjectID']>;
};

export type SmilesNode = {
  __typename?: 'SmilesNode';
  count: Scalars['Int'];
  hasSmiled: Scalars['Boolean'];
  users: Array<Scalars['ObjectID']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers: Array<Scalars['ObjectID']>;
  following: Array<Scalars['ObjectID']>;
  id: Scalars['ObjectID'];
  replies: Array<Scalars['ObjectID']>;
  smiles: Array<Scalars['ObjectID']>;
  username: Scalars['String'];
  vibes: Array<Scalars['ObjectID']>;
};

export type Vibe = {
  __typename?: 'Vibe';
  createdAt: Scalars['String'];
  id: Scalars['ObjectID'];
  message: Scalars['String'];
  replies: RepliesNode;
  reply?: Maybe<Vibe>;
  smiles: SmilesNode;
  user: User;
};

export enum VibeType {
  Comments = 'COMMENTS',
  Smiles = 'SMILES',
  Vibes = 'VIBES'
}
