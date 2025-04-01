import { objectType } from "nexus";

export const MoviesObject = objectType({
  name: "Movies",
  definition(t) {
    t.id("movies_id");
    t.string("name");
    t.string("descripion");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
  },
});
