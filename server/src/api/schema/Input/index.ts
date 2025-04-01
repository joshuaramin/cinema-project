import { extendInputType, inputObjectType } from "nexus";

export const PaginationInput = inputObjectType({
  name: "PaginationInput",
  definition(t) {
    t.int("take");
    t.int("page");
  },
});
export const UserInput = inputObjectType({
  name: "UserInput",
  definition(t) {
    t.string("email");
    t.string("password");
    t.field("profile", {
      type: "ProfileInput",
    });
  },
});

export const AuthInput = inputObjectType({
  name: "AuthInput",
  definition(t) {
    t.string("email");
    t.string("password");
  },
});

export const ProfileInput = inputObjectType({
  name: "ProfileInput",
  definition(t) {
    t.string("first_name");
    t.string("last_name");
    t.string("contact_no");
  },
});

export const AddressInput = inputObjectType({
  name: "AddressInput",
  definition(t) {
    t.string("country");
    t.string("city");
    t.string("address_line_1");
    t.string("address_line_2");
    t.string("zipcode");
  },
});

export const GroupInput = inputObjectType({
  name: "GroupInput",
  definition(t) {
    t.string("name");
    t.string("description");
  },
});
