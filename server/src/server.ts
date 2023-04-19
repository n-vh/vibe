import type { FastifyServerOptions } from 'fastify';
import jwt from '@fastify/jwt';
import cors from '@fastify/cors';
import { fastify } from 'fastify';
import { ApolloServer } from '@apollo/server';
import { fastifyApolloDrainPlugin, fastifyApolloHandler } from '@as-integrations/fastify';
import { mail } from '~/plugins';
import { Database } from '~/database';
import { authRouter, verifyRouter } from '~/router';
import { AuthContext } from '~/graphql/context';
import { typeDefinitions } from '~/graphql/typedefs';
import { GraphQLObjectID } from '~/graphql/scalars';
import { mutationResolver, queryResolver } from '~/graphql/resolvers';

const initServer = async (opts?: FastifyServerOptions) => {
  const app = fastify(opts);

  const apollo = new ApolloServer({
    includeStacktraceInErrorResponses: import.meta.env.DEV,
    plugins: [fastifyApolloDrainPlugin(app)],
    typeDefs: typeDefinitions,
    resolvers: {
      ObjectID: GraphQLObjectID,
      Query: queryResolver,
      Mutation: mutationResolver,
    },
  });

  await apollo.start();
  await Database.connect();

  app.register(cors, {
    origin: '*',
  });

  app.register(jwt, {
    secret: import.meta.env.VITE_JWT_SECRET,
  });

  app.register(mail, {
    username: 'api',
    key: import.meta.env.VITE_MAILGUN_KEY,
    url: import.meta.env.VITE_MAILGUN_URL,
  });

  app.register(authRouter);
  app.register(verifyRouter);

  app.route({
    url: '/graphql',
    method: ['POST', 'OPTIONS', 'GET'],
    handler: fastifyApolloHandler(apollo, {
      context: AuthContext,
    }),
  });

  if (import.meta.env.PROD) {
    try {
      const PORT = 6543;
      app.listen({ port: PORT });
      console.log('Listening on port', PORT);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  return app;
};

export const viteNodeApp = initServer();
