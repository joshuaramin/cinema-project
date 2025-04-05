import { subscriptionField } from "nexus";

export const GenreSubscriptions = subscriptionField("GenreSubscriptions", {
  type: "Genre",
  subscribe: async ({}, {}, { pubsub }) => {
    return await pubsub.asyncIterableIterator("CREATE_GENRE_SUB");
  },
  resolve: async (payload) => {
    return await payload;
  },
});
