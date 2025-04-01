import { interfaceType } from "nexus";

export const PaginationInterface = interfaceType({
  name: "Pagination",
  definition(t) {
    t.int("totalPages");
    t.int("currentPage");
    t.int("totalItems");
    t.boolean("hasNextPage");
    t.boolean("hasPrevPage");
  },
});

export const ErrorInterface = interfaceType({
  name: "Error",
  definition(t) {
    t.string("message");
  },
});

export const SuccessInterfacef = interfaceType({
  name: "Success",
  definition(t) {
    t.boolean("success");
    t.string("method");
  },
});
