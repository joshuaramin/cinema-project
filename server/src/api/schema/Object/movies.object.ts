import { idArg, nonNull, objectType } from "nexus";
import { Context } from "../types/index.js";

export const MoviesObject = objectType({
  name: "Movies",
  definition(t) {
    t.id("movies_id");
    t.string("name");
    t.string("description");
    t.int("year");
    t.Duration("duration");
    t.string("url");
    t.date("release_date");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
    t.int("totalGenre", {
      resolve: async ({ movies_id }) => {
        return await prisma.genre.count({
          where: { Movie: { some: { movies_id } } },
        });
      },
    });
    t.list.field("genre", {
      type: "Genre",
      resolve: async ({ movies_id }, {}, { prisma }: Context) => {
        return await prisma.genre.findMany({
          where: {
            Movie: { some: { movies_id } },
          },
        });
      },
    });
    t.field("getAllRelatedMovies", {
      type: "MoviesPagination",
      args: { input: nonNull("PaginationInput") },
      resolve: async (
        { movies_id },
        { input: { page, take } },
        { prisma }: Context
      ) => {
        const movie = await prisma.movie.findFirst({
          where: { movies_id },
          select: { Genre: true },
        });

        const genreIds = movie.Genre.map(({ genre_id }) => genre_id);

        const result = await prisma.movie.findMany({
          where: {
            movies_id,
            Genre: {
              some: {
                NOT: {
                  Movie: {
                    some: { movies_id },
                  },
                },
                genre_id: {
                  in: genreIds,
                },
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

export const MoviesPagination = objectType({
  name: "MoviesPagination",
  definition(t) {
    t.list.field("item", { type: "Movies" });
    t.implements("Pagination");
  },
});
