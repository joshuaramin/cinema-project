import { extendType, idArg, nonNull } from "nexus";
import Authorization from "../../helpers/authorization.js";
import { Context } from "../types/index.js";

export const AddressMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_address", {
      type: "AddressPayload",
      args: { input: nonNull("AddressInput"), profile_id: nonNull(idArg()) },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (_, { input, profile_id }, { prisma }: Context) => {
        for (const key in input) {
          if (input.hasOwnProperty(key)) {
            if (!input[key]) {
              return {
                __typename: "ErrorObject",
                code: 400,
                message: `${key} is required`,
              };
            }
          }
        }

        const address = await prisma.address.create({
          data: {
            address_line_1: input.address_line_1,
            address_line_2: input.address_line_2,
            city: input.city,
            country: input.country,
            zipcode: input.zipcode,
            Profile: { connect: { profile_id } },
          },
        });

        return {
          __typename: "Address",
          ...address,
        };
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
        { address_id, input },
        { prisma }: Context
      ): Promise<any> => {
        const address = await prisma.address.update({
          where: {
            address_id,
          },
          data: {
            address_line_1: input.address_line_1,
            address_line_2: input.address_line_2,
            city: input.city,
            country: input.country,
            zipcode: input.zipcode,
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
      resolve: async (_, { address_id }, { prisma }: Context) => {
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
