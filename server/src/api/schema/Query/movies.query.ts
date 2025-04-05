import { extendType, idArg, nonNull, stringArg } from "nexus";
import { Context } from "../types/index.js";
import Authorization from "../../helpers/authorization.js";

export const MoviesQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllMovies", {
      type: "MoviesPagination",
      args: { input: "PaginationInput", search: stringArg() },
      resolve: async (
        _,
        { input: { take, page }, search },
        { prisma }: Context
      ) => {
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
    t.field("getMoviesById", {
      type: "Movies",
      args: { movies_id: nonNull(idArg()) },
      resolve: async (_, { movies_id }, { prisma }: Context) => {
        return await prisma.movie.findFirst({
          where: { movies_id },
        });
      },
    });
  },
});
