import { objectType, stringArg } from "nexus";
import { Context } from "../types/index.js";

export const GenreObject = objectType({
  name: "Genre",
  definition(t) {
    t.id("genre_id");
    t.string("name");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
    t.int("totalMovies", {
      resolve: async ({ genre_id }, {}, { prisma }: Context) => {
        return await prisma.movie.count({
          where: {
            is_deleted: false,
            Genre: {
              some: { genre_id },
            },
          },
        });
      },
    });
    t.field("movies", {
      type: "MoviesPagination",
      args: { input: "PaginationInput", search: stringArg() },
      resolve: async (
        { genre_id },
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
            Genre: {
              some: {
                genre_id,
              },
            },
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

export const GenrePagination = objectType({
  name: "GenrePagination",
  definition(t) {
    t.list.field("item", { type: "Genre" });
    t.implements("Pagination");
  },
});
