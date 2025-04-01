import { objectType } from "nexus";
import { prisma } from "../../helpers/server.js";

export const Permission = objectType({
  name: "Permission",
  definition(t) {
    t.id("permission_id");
    t.string("type");
    t.string("value");
    t.Datetime("created_at");
    t.Datetime("updated_at");
  },
});
