import { objectType } from "nexus";

export const MediaObject = objectType({
  name: "Media",
  definition(t) {
    t.id("media_id");
    t.URL("url");
    t.string("file_name");
    t.string("mimetype");
    t.string("description");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
  },
});

export const MediaPagination = objectType({
  name: "MediaPagination",
  definition(t) {
    t.list.field("item", { type: "Media" });
    t.implements("Pagination");
  },
});
