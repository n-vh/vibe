import { CodegenConfig } from '@graphql-codegen/cli';

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
