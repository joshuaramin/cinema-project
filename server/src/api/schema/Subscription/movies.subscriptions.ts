import { subscriptionField } from "nexus";
import { Context } from "../types/index.js";

export const MoviesSubscriptions = subscriptionField("MoviesSubscriptions", {
  type: "Movies",
  subscribe: async ({}, {}, { pubsub }: Context) => {
    return await pubsub.asyncIterableIterator("CREATE_MOVIES_SUB");
  },
  resolve: async (payload) => {
    return await payload;
  },
});
