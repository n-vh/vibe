export const typeDefinitions = `#graphql
scalar ObjectID

type Me {
  username: String!
  email: String!
  avatar: String!
}

type User {
  id: ObjectID!
  username: String!
  email: String!
  avatar: String!
  vibes: [ObjectID]!
  comments: [ObjectID]!
  smiles: [ObjectID]!
  followers: [ObjectID]!
  following: [ObjectID]!
  createdAt: String!
}

type Node {
  count: Int!
  users: [ObjectID]!
}

type Vibe {
  id: ObjectID!
  user: User!
  message: String!
  comments: Node!
  smiles: Node!
  createdAt: String!
}

type Query {
  users(ids: [ObjectID]!): [User]
  user(id: ObjectID!): User
  me: Me
  timeline: [Vibe]
}

type Mutation {
  createVibe(message: String!): Vibe
  smile(id: ObjectID!): Vibe
  unsmile(id: ObjectID!): Vibe
}
`;
