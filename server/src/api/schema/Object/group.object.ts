import { objectType } from "nexus";
import { prisma } from "../../helpers/server.js";

export const GroupObjct = objectType({
  name: "Group",
  definition(t) {
    t.id("group_id");
    t.string("name");
    t.string("description");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
    t.list.field("permission", {
      type: "Permission",
      resolve: async ({ group_id }) => {
        return await prisma.permission.findMany({
          where: { Group: { some: { group_id } } },
        });
      },
    });
  },
});
