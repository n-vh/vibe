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
  user: ObjectID!
  message: String!
  comments: Node!
  smiles: Node!
  createdAt: String!
}

type Query {
  users(ids: [ObjectID]!): [User]
  user(id: ObjectID!): User
  me: Me
}
`;
