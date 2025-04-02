import { extendType } from "nexus";
import Authorization from "../../helpers/authorization.js";
import { Context } from "../types/index.js";

export const PermissionQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getAllPermission", {
      type: "Permission",
      authorize: (parents, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async ({}, {}, { prisma }: Context) => {
        return await prisma.permission.findMany();
      },
    });
  },
});
