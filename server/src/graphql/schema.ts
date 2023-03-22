import { makeExecutableSchema } from '@graphql-tools/schema';
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from 'graphql-constraint-directive';
import { mutationResolver, queryResolver } from './resolvers';
import { GraphQLObjectID } from './scalars';
import { typeDefinitions } from './typedefs';

export const schema = constraintDirective()(
  makeExecutableSchema({
    typeDefs: [constraintDirectiveTypeDefs, typeDefinitions],
    resolvers: {
      ObjectID: GraphQLObjectID,
      Query: queryResolver,
      Mutation: mutationResolver,
    },
  }),
);
