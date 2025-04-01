import { extendType, idArg, list, nonNull, stringArg } from "nexus";
import { prisma } from "../../helpers/server.js";
import jsonwebtoken from "jsonwebtoken";
import { Slugify } from "../../helpers/slugify.js";
import Authorization from "../../helpers/authorization.js";

const { verify } = jsonwebtoken;

export const UserRoleMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_user_role", {
      type: "UserRolePayload",
      args: { name: nonNull(stringArg()), description: stringArg() },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },

      resolve: async (_, { name }) => {
        if (!name) {
          return {
            __typename: "ErrorObject",
            message: "Name is required",
          };
        }
        const user_role = await prisma.user_Role.create({
          data: {
            name,
            slug: Slugify(name),
          },
        });

        return {
          __typename: "User_Role",
          ...user_role,
        };
      },
    });
    t.field("add_user_role", {
      type: "User_Role",
      args: { user_role_id: nonNull(idArg()), user_id: nonNull(idArg()) },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (_, { user_role_id, user_id }) => {
        return await prisma.user_Role.update({
          where: { user_role_id },
          data: {
            User: {
              connect: { user_id },
            },
          },
        });
      },
    });
  },
});
