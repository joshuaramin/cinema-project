import { objectType, stringArg } from "nexus";

export const GenreObject = objectType({
  name: "Genre",
  definition(t) {
    t.id("genre_id");
    t.string("name");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
    t.field("movies", {
      type: "MoviesPagination",
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
