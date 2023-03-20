export const typeDefinitions = `#graphql
scalar ObjectID

type Me {
  username: String!
  email: String!
  avatar: String!
}

type User {
  username: String!
  avatar: String!
  vibes: [ObjectID]!
  comments: [ObjectID]!
  smiles: [ObjectID]!
  createdAt: String! @constraint(format: "date")
}

type Query {
  users(ids: [ObjectID]!): [User]
  user(id: ObjectID!): User
  me: Me
}
`;
