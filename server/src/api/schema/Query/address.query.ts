import { extendType, idArg, nonNull } from "nexus";
import { Context } from "../types/index.js";

export const AddressQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getAllAddressByUserId", {
      type: "AddressPagination",
      args: { profile_id: nonNull(idArg()), input: "PaginationInput" },
      resolve: async (_, { profile_id, input: { page, take } }, { prisma}: Context) => {
        const result = await prisma.address.findMany({
          where: {
            is_deleted: false,
            Profile: {
              profile_id,
            },
          },
        });

        const offset = (page - 1) * take;
        const item = result.slice(offset, offset + take);

        return {
          item,
          totalPages: Math.ceil(result.length / take),
          totalItems: result.length,
          currentPage: page,
          hasNextPage: page < Math.ceil(result.length / take),
          hasPrevPage: page > 1,
        };
      },
    });
  },
});
