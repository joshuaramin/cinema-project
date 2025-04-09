import { ApolloLink, HttpLink, NextLink, Operation } from "@apollo/client";
import {
  registerApolloClient,
  InMemoryCache,
  ApolloClient
} from "@apollo/client-integration-nextjs";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {

  const authMiddleware = new ApolloLink((operation: Operation, forward: NextLink) => {
    operation.setContext(({ headers = {} }: { headers?: Record<string, string> }) => ({
      headers: {
        ...headers,
        'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY
      },
    }));
    return forward(operation);
  });


  return new ApolloClient({
    cache: new InMemoryCache(),
    link: createUploadLink({
      credentials: "include",
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    }),
  })
})