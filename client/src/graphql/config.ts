import { Mutation, Query } from './schema';
import { useQuery as urqlQuery, useMutation as urqlMutation } from 'urql';

export const useQuery = urqlQuery<Query>;
export const useMutation = urqlMutation<Mutation>;

export default {
  schema: 'http://localhost:6543/graphql',
  generates: {
    './src/graphql/schema.ts': {
      plugins: [
        'typescript',
        {
          add: {
            content: 'import { ObjectId } from "mongodb";',
          },
        },
      ],
    },
  },
  config: {
    scalars: {
      ObjectID: 'ObjectId',
    },
  },
};
