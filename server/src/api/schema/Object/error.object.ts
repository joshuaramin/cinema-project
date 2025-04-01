import { objectType } from "nexus";

export const ErrorObject = objectType({
  name: "ErrorObject",
  definition(t) {
    t.implements("Error");
  },
});
