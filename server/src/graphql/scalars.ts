import { GraphQLScalarType } from 'graphql';
import { ObjectId } from 'mongodb';

const testObjectID = (value: string): ObjectId => {
  const regex = /^[A-Fa-f0-9]{24}$/;
  if (!regex.test(value)) {
    throw new TypeError();
  }
  return new ObjectId(value);
};

export const GraphQLObjectID = new GraphQLScalarType({
  name: 'ObjectID',
  serialize: testObjectID,
  parseValue: testObjectID,
});
