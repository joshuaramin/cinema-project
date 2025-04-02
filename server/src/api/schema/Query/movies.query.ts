import { extendType, stringArg } from "nexus";

export const MoviesQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllMoveis", {
      type: "MoveisPagination",
      args: { input: "PaginationInput", search: stringArg() },
      resolve: async (_, { input: { take, page }, search }) => {
        const result = await prisma.movie.findMany({
          where: {
            name: {
              contains: search,
              mode: "insensitive",
            },
            is_deleted: false,
          },
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
