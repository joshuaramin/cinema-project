import { objectType } from "nexus";

export const GenreObject = objectType({
  name: "Genre",
  definition(t) {
    t.id("genre_id");
    t.string("name");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
  },
});

export const GenrePagination = objectType({
  name: "GenrePagination",
  definition(t) {
    t.list.field("item", { type: "Genre" });
    t.implements("Pagination");
  },
});
