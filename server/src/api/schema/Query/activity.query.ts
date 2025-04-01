import { extendType, nonNull } from "nexus";
import { prisma } from "../../helpers/server.js";

export const ActivitLogsQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllActivityLogs", {
      type: "ActivityLogsPagination",
      args: { input: nonNull("PaginationInput") },
      resolve: async (_, { input: { take, page } }) => {
        const result = await prisma.activity_Logs.findMany();
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
  },
});
