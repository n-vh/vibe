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

input ModifySettingsInput {
  email: String
  avatar: String
  password: String
}

enum VibeType {
  VIBES
  COMMENTS
  SMILES
}

type Query {
  comments(id: ObjectID!): [Vibe!]!
  friends: [User!]!
  followers(id: ObjectID!): [User!]!
  following(id: ObjectID!): [User!]!
  me: Me
  timeline(after: ObjectID): PaginatedVibes
  vibe(id: ObjectID!): Vibe
  vibes(id: ObjectID!, type: VibeType!): [Vibe!]!
  user(id: ObjectID, username: String): User
  users(query: String!): [User!]!
}

type Mutation {
  addComment(id: ObjectID!, message: String!): Vibe
  addFollow(id: ObjectID!): User
  addSmile(id: ObjectID!): Vibe
  createVibe(message: String!): Vibe
  deleteVibe(id: ObjectID!): Vibe
  modifySettings(input: ModifySettingsInput!): User
  removeFollow(id: ObjectID!): User
  removeSmile(id: ObjectID!): Vibe
}
`;
