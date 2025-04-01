import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../helpers/server.js";
import { ResultUser } from "../types/index.js";

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllUser", {
      type: "UserPagination",
      args: { input: nonNull("PaginationInput") },
      resolve: async (_, { input: { take, page } }): Promise<ResultUser> => {
        const result = await prisma.user.findMany({
          where: {
            is_deleted: false,
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
    t.field("getUserById", {
      type: "User",
      args: { user_id: nonNull(idArg()) },
      resolve: async (_, { user_id }) => {
        return await prisma.user.findFirst({
          where: { user_id },
        });
      },
    });
  },
});
