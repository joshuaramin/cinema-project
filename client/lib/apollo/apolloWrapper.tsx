"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, concat, from, HttpLink, NextLink, Operation, split, } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { createClient } from 'graphql-ws'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from "@apollo/client/utilities";
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

function makeClient() {


    const wsLink = new GraphQLWsLink(createClient({
        url: `ws://localhost:4000/graphql`
    }))

    const uploadLink = createUploadLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY as string
        },
        fetchOptions: {
            cache: "default"
        },
        credentials: "include",
    })

    const authMiddleware = new ApolloLink((operation: Operation, forward: NextLink) => {
        operation.setContext(({ headers = {} }: { headers?: Record<string, string> }) => ({
            headers: {
                ...headers,

            },
        }));
        return forward(operation);
    });

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        uploadLink
    );


    return new ApolloClient({
        cache: new InMemoryCache(),
        credentials: "include",
        link: from([authMiddleware, splitLink]),
    });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}