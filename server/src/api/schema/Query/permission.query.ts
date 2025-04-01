import { extendType } from "nexus";
import { prisma } from "../../helpers/server.js";
import Authorization from "../../helpers/authorization.js";

export const PermissionQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllPermission", {
      type: "Permission",
      authorize: (parents, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async () => {
        return await prisma.permission.findMany();
      },
    });
  },
});
