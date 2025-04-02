import { extendType, stringArg } from "nexus";
import { Context } from "../types/index.js";

export const SearchQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("getCentralSearch", {
      type: "CentralSearch",
      args: { search: stringArg() },
      resolve: async (_, { search }, { prisma }: Context): Promise<any> => {
        const users = await prisma.user.findMany({
          where: {
            is_deleted: false,
            OR: [
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                Profile: {
                  OR: [
                    {
                      first_name: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                    {
                      last_name: {
                        contains: search,
                        mode: "insensitive",
                      },
                    },
                  ],
                },
              },
            ],
          },
          take: 5,
          skip: 0,
        });

        const media = await prisma.media.findMany({
          where: {
            is_deleted: false,
          },
          take: 5,
          skip: 0,
        });
        return {
          users,
          media,
        };
      },
    });
  },
});
