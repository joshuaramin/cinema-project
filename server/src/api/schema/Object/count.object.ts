import { objectType } from "nexus";

export const CountObject = objectType({
  name: "count",
  definition(t) {
    t.int("user_roles");
    t.int("users");
    t.int("group");
  },
});
