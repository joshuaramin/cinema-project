import { objectType } from "nexus";

export const SearchObject = objectType({
  name: "CentralSearch",
  definition(t) {
    t.list.field("users", {
      type: "User",
    });
    t.list.field("media", {
      type: "Media",
    });
  },
});
