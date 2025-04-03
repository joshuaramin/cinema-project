import { extendType, idArg, nonNull } from "nexus";
import { Context } from "../types/index.js";
import { Slugify } from "../../helpers/slugify.js";

export const GenreMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_genre", {
      type: "GenrePayload",
      args: { input: "GenreInput" },
      resolve: async (_, { input }, { prisma }: Context) => {
        for (const key in input) {
          if (input.hasOwnProperty(key)) {
            if (!input[key]) {
              return {
                __typename: "ErrorObject",
                message: `${key} is required`,
              };
            }
          }
        }
        const genre = await prisma.genre.create({
          data: { name: input.name, slug: Slugify(input.name) },
        });

        return {
          __typename: "Genre",
          ...genre,
        };
      },
    });
    t.field("update_genre", {
      type: "GenrePayload",
      args: { genre_id: nonNull(idArg()), input: "GenreInput" },
      resolve: async (_, { genre_id, input }, { prisma }: Context) => {
        for (const key in input) {
          if (input.hasOwnProperty(key)) {
            if (!input[key]) {
              return {
                __typename: "ErrorObject",
                message: `${key} is required`,
              };
            }
          }
        }

        const genre = await prisma.genre.update({
          where: {
            genre_id,
          },
          data: {
            name: input.name,
            slug: Slugify(input.name),
          },
        });

        return {
          __typename: "Genre",
          ...genre,
        };
      },
    });
    t.field("delete_genre", {
      type: "Genre",
      args: { genre_id: nonNull(idArg()) },
      resolve: async (_, { genre_id }, { prisma }: Context) => {
        return await prisma.genre.update({
          where: { genre_id },
          data: { is_deleted: true },
        });
      },
    });
  },
});
