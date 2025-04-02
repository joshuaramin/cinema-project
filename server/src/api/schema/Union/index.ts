import { unionType } from "nexus";

export const AuthPayload = unionType({
  name: "Credentials",
  definition(t) {
    t.members("token", "ErrorObject");
  },
});

export const GroupPayload = unionType({
  name: "GroupPayload",
  definition(t) {
    t.members("Group", "ErrorObject");
  },
});
export const PermissionPayload = unionType({
  name: "PermissionPayload",
  definition(t) {
    t.members("Permission", "ErrorObject");
  },
});

export const RolePayload = unionType({
  name: "UserRolePayload",
  definition(t) {
    t.members("User_Role", "ErrorObject");
  },
});

export const UserPayload = unionType({
  name: "UserPayload",
  definition(t) {
    t.members("User", "ErrorObject");
  },
});

export const ProfilePayload = unionType({
  name: "ProfilePayload",
  definition(t) {
    t.members("Profile", "ErrorObject");
  },
});

export const MoviePayload = unionType({
  name: "MoviePayload",
  definition(t) {
    t.members("Movies", "ErrorObject");
  },
});

export const GenrePayload = unionType({
  name: "GenrePayload",
  definition(t) {
    t.members("Genre", "ErrorObject");
  },
});
