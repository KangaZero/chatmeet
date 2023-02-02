import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
import { getSession } from 'next-auth/react';

import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

async function main() {
  dotenv.config();
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema(
   { typeDefs,
    resolvers}
  )

  const corsOption = {
    origin: process.env.CLIENT_ORIGIN,
    // To allow session to pass on
    credentials: true,
  }

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({req, res}) => {
        const session = await getSession({ req });
        console.log('context sess', {session})
        return session 
    },
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }), 
        ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app, cors: corsOption
  });

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

main().catch(err => console.error(err))