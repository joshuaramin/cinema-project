import { objectType } from "nexus";
import { prisma } from "../../helpers/server.js";

export const UserRole = objectType({
  name: "User_Role",
  definition(t) {
    t.id("user_role_id");
    t.string("name");
    t.string("description");
    t.string("slug");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
    t.list.field("permission", {
      type: "Permission",
      resolve: async ({ user_role_id }) => {
        return await prisma.permission.findMany({
          where: {
            User_Role: {
              some: {
                user_role_id,
              },
            },
          },
        });
      },
    });
    t.list.field("user", {
      type: "User",
      resolve: async ({ user_role_id }) => {
        return await prisma.user.findMany({
          where: {
            UserRole: {
              user_role_id,
            },
          },
        });
      },
    });
  },
});

export const UserRolePagination = objectType({
  name: "UserRolePagination",
  definition(t) {
    t.list.field("item", {
      type: "User_Role",
    });
    t.implements("Pagination");
  },
});
