import { objectType } from "nexus";
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
  },
});

export const MoviesPagination = objectType({
  name: "MoviesPagination",
  definition(t) {
    t.list.field("item", { type: "Movies" });
    t.implements("Pagination");
  },
});
