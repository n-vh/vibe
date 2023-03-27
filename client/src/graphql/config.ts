import { CodegenConfig } from '@graphql-codegen/cli';
import { Query } from './schema';
import { useQuery as urqlQuery } from 'urql';

export const useQuery = urqlQuery<Query>;

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
} satisfies CodegenConfig;
