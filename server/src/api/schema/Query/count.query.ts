import { extendType } from "nexus";
import { prisma } from "../../helpers/server.js";

export const CountQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("countingRecords", {
      type: "count",
      resolve: async (): Promise<any> => {
  
        const users = await prisma.user.count({
          where: { is_deleted: false },
        });

        const users_roles = await prisma.user_Role.count({
          where: { is_deleted: false },
        });

        const group = await prisma.group.count({
          where: { is_deleted: false },
        });

      

        return {
          users,
          user_roles: users_roles,
          group,
        };
      },
    });
  },
});
