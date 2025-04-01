import { extendType } from "nexus";
import { prisma } from "../../helpers/server.js";

export const MediaQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllMedia", {
      type: "MediaPagination",
      args: { input: "PaginationInput" },
      resolve: async (_, { input: { page, take } }) => {
        const result = await prisma.media.findMany({
          where: { is_deleted: false },
          orderBy: {
            created_at: "desc",
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
  },
});
