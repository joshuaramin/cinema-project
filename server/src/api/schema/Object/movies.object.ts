import { objectType } from "nexus";

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
  },
});

export const MoviesPagination = objectType({
  name: "MoveisPagination",
  definition(t) {
    t.list.field("item", { type: "Movies" });
    t.implements("Pagination");
  },
});
