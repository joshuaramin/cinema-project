import { extendType, idArg, list, nonNull, stringArg } from "nexus";
import Authorization from "../../helpers/authorization.js";
import { Context } from "../types/index.js";

export const PermissionMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_role_permission", {
      type: "PermissionPayload",
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      args: { type: nonNull(stringArg()), group_id: nonNull(idArg()) },
      resolve: async (_, { type, group_id }, { prisma }: Context) => {
        if (!type) {
          return {
            __typename: "ErrorObject",
            message: "Type is required",
          };
        }

        const group = await prisma.group.findFirst({ where: { group_id } });
        const permission = await prisma.permission.create({
          data: {
            type: `${type}.${group.name.toLowerCase().replaceAll(" ", "_")}`,
            Group: {
              connect: {
                group_id,
              },
            },
          },
        });

        return {
          __typename: "Permission",
          ...permission,
        };
      },
    });
    t.field("add_remove_permission_user_role", {
      type: "Permission",
      args: {
        add: nonNull(list(stringArg())),
        removed: nonNull(list(stringArg())),
        user_role_id: nonNull(idArg()),
      },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (_, { add, removed, user_role_id }, { prisma }: Context) => {
        return await prisma.user_Role.update({
          data: {
            Permission: {
              connect: add.map((permission_id) => ({ permission_id })),
              disconnect: removed.map((permission_id) => ({
                permission_id,
              })),
            },
          },
          where: {
            user_role_id,
          },
        });
      },
    });
  },
});
