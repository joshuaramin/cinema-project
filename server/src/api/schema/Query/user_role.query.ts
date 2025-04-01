import { extendType, idArg, nonNull, stringArg } from "nexus";
import { prisma } from "../../helpers/server.js";
import { ResultUserRole, User_Role } from "../types/index.js";

export const UserRoleQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllUserRole", {
      type: "UserRolePagination",
      args: { input: nonNull("PaginationInput"), search: stringArg() },
      resolve: async (
        _,
        { input: { take, page }, search }
      ): Promise<ResultUserRole> => {
        const result = await prisma.user_Role.findMany({
          where: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          orderBy: {
            created_at: "asc",
          },
        });

        const offset = (page - 1) * take;
        const item = result.slice(offset, offset + take);

        return {
          item,
          totalPages: Math.ceil(result.length / take),
          totalItems: result.length,
          currentPage: page,
          hasNextPage: page < Math.ceil(result.length / take),
          hasPrevPage: page > 1,
        };
      },
    });
    t.field("getUserRoleBySlug", {
      type: "User_Role",
      args: { slug: nonNull(stringArg()) },
      resolve: async (_, { slug }) => {
        return await prisma.user_Role.findFirst({
          where: {
            slug,
          },
        });
      },
    });
  },
});
