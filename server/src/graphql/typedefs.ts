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
  comments: [ObjectID!]!
  smiles: [ObjectID!]!
  followers: [ObjectID!]!
  following: [ObjectID!]!
  createdAt: String!
}

type CommentsNode {
  count: Int!
  hasCommented: Boolean!
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
  comments: CommentsNode!
  smiles: SmilesNode!
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

type Query {
  user(id: ObjectID!): User
  me: Me
  timeline(after: ObjectID): PaginatedVibes
}

type Mutation {
  createVibe(message: String!): Vibe
  deleteVibe(id: ObjectID!): Vibe
  smileVibe(id: ObjectID!): Vibe
  unsmileVibe(id: ObjectID!): Vibe
  follow(id: ObjectID!): User
  unfollow(id: ObjectID!): User
}
`;
