import { subscriptionField } from "nexus";
import { Context } from "../types/index.js";
import { pubsub } from "../../helpers/server.js";

export const MoviesSubscriptions = subscriptionField("MoviesSubscriptions", {
  type: "Movies",
  subscribe: async () => {
    return await pubsub.asyncIterableIterator("CREATE_MOVIES_SUB");
  },
  resolve: async (payload) => {
    return await payload;
  },
});