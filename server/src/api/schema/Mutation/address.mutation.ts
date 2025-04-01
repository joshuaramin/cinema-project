import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../helpers/server.js";
import Authorization from "../../helpers/authorization.js";

export const AddressMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_address", {
      type: "Address",
      args: { input: nonNull("AddressInput"), profile_id: nonNull(idArg()) },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (
        _,
        {
          input: { address_line_1, address_line_2, city, country, zipcode },
          profile_id,
        }
      ) => {
        return await prisma.address.create({
          data: {
            address_line_1,
            address_line_2,
            city,
            country,
            zipcode,
            Profile: { connect: { profile_id } },
          },
        });
      },
    });
    t.field("update_address", {
      type: "Address",
      args: { address_id: nonNull(idArg()), input: nonNull("AddressInput") },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (
        _,
        {
          address_id,
          input: { address_line_1, address_line_2, city, country, zipcode },
        }
      ): Promise<any> => {
        if (!address_line_1) {
          return { message: "Address is required" };
        }
        if (!city) {
          return { message: "City is required" };
        }

        if (!country) {
          return { message: "Country is required" };
        }

        if (!zipcode) {
          return { message: "zipcode is required" };
        }
        const address = await prisma.address.update({
          where: {
            address_id,
          },
          data: {
            address_line_1,
            address_line_2,
            city,
            country,
            zipcode,
          },
        });

        return {
          __typename: "Address",
          ...address,
        };
      },
    });
    t.field("delete_address", {
      type: "Address",
      args: { address_id: nonNull(idArg()) },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (_, { address_id }) => {
        return await prisma.address.update({
          where: {
            address_id,
          },
          data: {
            is_deleted: true,
          },
        });
      },
    });
  },
});
