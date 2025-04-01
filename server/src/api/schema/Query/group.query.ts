import { extendType, stringArg } from "nexus";
import { prisma } from "../../helpers/server.js";

export const GroupQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllGroup", {
      type: "Group",
      args: { search: stringArg() },
      resolve: async (_, { search }) => {
        return await prisma.group.findMany({
          where: {
            name: {
              contains: search,
              mode: "insensitive",
            },
            is_deleted: false,
          },
        });
      },
    });
  },
});
