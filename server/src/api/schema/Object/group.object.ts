import { objectType } from "nexus";
import { Context } from "../types/index.js";

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
      resolve: async ({ group_id }, {}, { prisma }: Context) => {
        return await prisma.permission.findMany({
          where: { Group: { some: { group_id } } },
        });
      },
    });
  },
});
