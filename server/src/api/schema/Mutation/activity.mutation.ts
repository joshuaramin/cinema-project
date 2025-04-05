import { extendType, idArg, nonNull } from "nexus";
import { Context } from "../types/index.js";

export const ActivityLogsMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("logout_activity_logs", {
      type: "Activity_Logs",
      args: { user_id: nonNull(idArg()) },
      resolve: async (_, { user_id }, { prisma }: Context) => {
        return await prisma.activity_Logs.create({
          data: {
            title: "Logged Out",
            description: "You logged out into your account",
            type: "LOGOUT",
            user_id,
          },
        });
      },
    });
  },
});
