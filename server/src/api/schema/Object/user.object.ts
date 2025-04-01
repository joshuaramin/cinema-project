import { objectType } from "nexus";
import { prisma } from "../../helpers/server.js";

export const UserObject = objectType({
  name: "User",
  definition(t) {
    t.id("user_id");
    t.string("account_no");
    t.string("email");
    t.string("password");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
    t.field("user_role", {
      type: "User_Role",
      resolve: async ({ user_id }) => {
        return await prisma.user_Role.findFirst({
          where: {
            User: {
              some: {
                user_id,
              },
            },
          },
        });
      },
    });
    t.field("profile", {
      type: "Profile",
      resolve: async ({ user_id }) => {
        return await prisma.profile.findFirst({
          where: { user_id },
        });
      },
    });
    t.list.field("activity_logs", {
      type: "Activity_Logs",
      resolve: async ({ user_id }) => {
        return await prisma.activity_Logs.findMany({
          where: {
            user_id,
          },
        });
      },
    });
  },
});

export const token = objectType({
  name: "token",
  definition(t) {
    t.id("user_id");
    t.field("user", {
      type: "User",
      resolve: async ({ user_id }) => {
        return await prisma.user.findFirst({
          where: { user_id },
        });
      },
    });
    t.string("token");
  },
});

export const UserPagination = objectType({
  name: "UserPagination",
  definition(t) {
    t.list.field("item", {
      type: "User",
    });
    t.implements("Pagination");
  },
});
