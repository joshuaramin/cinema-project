import { objectType } from "nexus";

export const ActivityLogs = objectType({
  name: "Activity_Logs",
  definition(t) {
    t.id("activity_logs_id");
    t.string("title");
    t.string("description");
    t.string("type");
    t.boolean("is_deleted");
    t.Datetime("created_at");
    t.Datetime("updated_at");
  },
});

export const ActivityLogsPagination = objectType({
  name: "ActivityLogsPagination",
  definition(t) {
    t.list.field("item", { type: "Activity_Logs" });
    t.implements("Pagination");
  },
});
