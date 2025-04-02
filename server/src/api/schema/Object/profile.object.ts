import { objectType } from "nexus";
import { Context } from "../types/index.js";

export const ProfileObjec = objectType({
  name: "Profile",
  definition(t) {
    t.id("profile_id");
    t.string("first_name");
    t.string("last_name");
    t.string("contact_no");
    t.Datetime("created_at");
    t.Datetime("updated_at");
    t.list.field("address", {
      type: "Address",
      resolve: async ({ profile_id }, {}, { prisma }: Context) => {
        return await prisma.address.findMany({
          where: { profile_id },
        });
      },
    });
  },
});
