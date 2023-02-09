import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4'
// import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
import cors from "cors";
import { json } from "body-parser";

import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from "graphql-subscriptions";
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { GraphQLContext, Session, SubscriptionContext } from './util/types';

async function main() {
  dotenv.config();
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);
  const prisma = new PrismaClient();
  const pubsub = new PubSub();


  const schema = makeExecutableSchema(
   { typeDefs,
    resolvers}
  )

  // Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql/subscriptions',
});

// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer(
  {
   schema, 
   context: async (ctx: SubscriptionContext): Promise<GraphQLContext> => {
      ctx;
      if (ctx.connectionParams && ctx.connectionParams.session) {
      const session  = ctx.connectionParams.session;

      return { session, prisma, pubsub };
      }

      return { session: null, prisma, pubsub }
   },
   },
    wsServer);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer({
    schema,
    // schema,
    csrfPrevention: true,
    // cache: 'bounded',
    // context: async ({req, res}): Promise<GraphQLContext> => {
    //     const session = await getSession({ req }) as Session;
    //     // console.log('context sess', {session})
    //     return { session, prisma, pubsub };
    // },
    plugins: [
      // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }), 
        // ApolloServerPluginLandingPageLocalDefault({ embed: true }),
           // Proper shutdown for the WebSocket server.
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
    ],
  });

  // More required logic for integrating with Express
  await server.start();

  
  const corsOptions = {
    origin: process.env.BASE_URL,
    credentials: true,
  };

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const session = await getSession({ req });

        return { session: session as Session, prisma, pubsub };
      },
    })
  );

  const PORT = 4000

  await new Promise<void>((resolve) => 
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

main().catch(err => console.error(err)) 