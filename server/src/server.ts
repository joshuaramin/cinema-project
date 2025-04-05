import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from "node:http";
import { join } from "node:path";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
import { prisma, pubsub } from "./api/helpers/server.js";
import cors from "cors";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import nex from "nexus";

const { json } = bodyParser;
const { makeSchema, fieldAuthorizePlugin } = nex;

import * as GraphQLScalars from "./api/schema/Scalars/index.js";
import * as GraphQLQuery from "./api/schema/Query/index.js";
import * as GraphQLMutation from "./api/schema/Mutation/index.js";
import * as GraphQLObject from "./api/schema/Object/index.js";
import * as GraphQLUnion from "./api/schema/Union/index.js";
import * as GraphQLInterface from "./api/schema/Interface/index.js";
import * as GraphQLInput from "./api/schema/Input/index.js";
import * as GraphQLEnum from "./api/schema/Enum/index.js";
import * as GraphQLSubscriptions from "./api/schema/Subscription/index.js";

import { graphqlUploadExpress } from "graphql-upload-ts";

(async function CapastonProject() {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeSchema({
    types: [
      GraphQLScalars,
      GraphQLObject,
      GraphQLQuery,
      GraphQLMutation,
      GraphQLUnion,
      GraphQLInterface,
      GraphQLInput,
      GraphQLEnum,
      GraphQLSubscriptions,
    ],
    plugins: [fieldAuthorizePlugin()],
    features: {
      abstractTypeStrategies: {
        resolveType: false,
        isTypeOf: false,
      },
    },
    outputs: {
      schema: join(process.cwd(), "./src/api/generate/schema.graphql"),
      typegen: join(process.cwd(), "./src/api/generate/schema.ts"),
    },
  });

  app.use(graphqlUploadExpress());
  const wsSevrer = new WebSocketServer({
    path: "/graphql",
    server: httpServer,
  });

  const serverCleanup = useServer({ schema }, wsSevrer);

  const server = new ApolloServer({
    schema,
    cache: new InMemoryLRUCache(),
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      {
        async serverWillStart() {
          return {
            async drainServer() {
              serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(cookieParser());

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      credentials: true,

      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res, prisma, pubsub };
      },
    })
  );
  await new Promise(() => {
    httpServer.listen({ port: process.env.PORT || 4000 });
    console.log(`Server is running at http://localhost:4000/graphql 🚀 💻 `);
  });
})();
