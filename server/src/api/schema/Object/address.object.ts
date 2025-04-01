import { objectType } from "nexus";
import { prisma } from "../../helpers/server.js";

export const AddressObject = objectType({
  name: "Address",
  definition(t) {
    t.id("address_id");
    t.string("country");
    t.string("city");
    t.string("address_line_1");
    t.string("address_line_2");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
    t.field("profile", {
      type: "Profile",
      resolve: async ({ address_id }) => {
        return await prisma.profile.findFirst({
          where: { Address: { some: { address_id } } },
        });
      },
    });
  },
});

export const AddressPagination = objectType({
  name: "AddressPagination",
  definition(t) {
    t.list.field("item", { type: "Address" });
    t.implements("Pagination");
  },
});
