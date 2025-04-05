import { subscriptionField } from "nexus";
import { Context } from "../types/index.js";

export const UserSubscriptions = subscriptionField("UserSubscriptions", {
  type: "User",
  subscribe: async ({}, {}, { pubsub }: Context) => {
    return await pubsub.asyncIterableIterator("CREATE_USER_SUBS");
  },
  resolve: async (payload) => {
    return payload;
  },
});
