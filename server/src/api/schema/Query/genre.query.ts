import { extendType, idArg, nonNull, stringArg } from "nexus";
import { Context } from "../types/index.js";

export const GenreQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllGenre", {
      type: "GenrePagination",
      args: { input: "PaginationInput", search: stringArg() },
      resolve: async (
        _,
        { input: { take, page }, search },
        { prisma }: Context
      ) => {
        const result = await prisma.genre.findMany({
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
    t.field("getGenreById", {
      type: "Genre",
      args: { genre_id: nonNull(idArg()) },
      resolve: async (_, { genre_id }, { prisma }: Context) => {
        return await prisma.genre.findFirst({
          where: { genre_id },
        });
      },
    });
  },
});
