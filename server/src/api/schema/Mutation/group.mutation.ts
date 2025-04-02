import { extendType, idArg, nonNull } from "nexus";
import Authorization from "../../helpers/authorization.js";
import { Context } from "../types/index.js";

export const GroupMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("add_user_role_to_group", {
      type: "Group",
      args: { group_id: nonNull(idArg()), user_role_id: nonNull(idArg()) },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (_, { group_id, user_role_id }, { prisma }: Context) => {
        return await prisma.group.update({
          where: {
            group_id,
          },
          data: {
            UserRole: {
              connect: {
                user_role_id,
              },
            },
          },
        });
      },
    });
    t.field("create_group", {
      type: "GroupPayload",
      args: { input: "GroupInput" },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (_, { input }, { prisma }: Context) => {
        for (const key in input) {
          if (input.hasOwnProperty(key)) {
            if (!input[key]) {
              return {
                __typename: "ErrorObject",
                code: 400,
                message: `${key} is required`,
              };
            }
          }
        }

        const group = await prisma.group.create({
          data: {
            name: input.name,
            description: input.description,
            Permission: {
              create: [
                {
                  type: `read.${input.name.toLowerCase().replaceAll(" ", "_")}`,
                },
                {
                  type: `write.${input.name
                    .toLowerCase()
                    .replaceAll(" ", "_")}`,
                },
                {
                  type: `edit.${input.name.toLowerCase().replaceAll(" ", "_")}`,
                },
                {
                  type: `delete.${input.name
                    .toLowerCase()
                    .replaceAll(" ", "_")}`,
                },
              ],
            },
          },
        });

        return {
          __typename: "Group",
          ...group,
        };
      },
    });
    t.field("update_group", {
      type: "GroupPayload",
      args: { input: "GroupInput", group_id: nonNull(idArg()) },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (_, { input, group_id }, { prisma }: Context) => {
        for (const key in input) {
          if (input.hasOwnProperty(key)) {
            if (!input[key]) {
              return {
                __typename: "ErrorObject",
                code: 400,
                message: `${key} is required`,
              };
            }
          }
        }
        return await prisma.group.update({
          data: {
            is_deleted: true,
          },
          where: {
            group_id,
          },
        });
      },
    });
    t.field("delete_group", {
      type: "Group",
      args: { group_id: nonNull(idArg()) },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (_, { group_id }, { prisma }: Context) => {
        return await prisma.group.update({
          data: {
            is_deleted: true,
          },
          where: {
            group_id,
          },
        });
      },
    });
  },
});
