export const typeDefinitions = `#graphql
scalar ObjectID

type Me {
  id: ObjectID!
  username: String!
  email: String!
  avatar: String!
}

type User {
  id: ObjectID!
  username: String!
  email: String!
  avatar: String!
  vibes: [ObjectID!]!
  replies: [ObjectID!]!
  smiles: [ObjectID!]!
  followers: [ObjectID!]!
  following: [ObjectID!]!
  createdAt: String!
}

type RepliesNode {
  count: Int!
  hasReplied: Boolean!
  vibes: [ObjectID!]!
}

type SmilesNode {
  count: Int!
  hasSmiled: Boolean!
  users: [ObjectID!]!
}

type Vibe {
  id: ObjectID!
  user: User!
  message: String!
  replies: RepliesNode!
  smiles: SmilesNode!
  reply: Vibe
  createdAt: String!
}

type PageInfo {
  hasNext: Boolean!
  cursor: String!
}

type PaginatedVibes {
  vibes: [Vibe!]!
  pageInfo: PageInfo!
}

enum VibeType {
  VIBES
  REPLIES
  SMILES
}

type Query {
  user(id: ObjectID, username: String): User
  me: Me
  timeline(after: ObjectID): PaginatedVibes
  vibes(id: ObjectID!, type: VibeType!): [Vibe!]!
  vibe(id: ObjectID!): Vibe
  vibeReplies(id: ObjectID!): [Vibe!]!
}

type Mutation {
  createVibe(message: String!): Vibe
  deleteVibe(id: ObjectID!): Vibe
  smileVibe(id: ObjectID!): Vibe
  unsmileVibe(id: ObjectID!): Vibe
  replyVibe(id: ObjectID!, message: String!): Vibe
  follow(id: ObjectID!): User
  unfollow(id: ObjectID!): User
}
`;
