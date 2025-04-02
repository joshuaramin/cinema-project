import { extendType } from "nexus";
import { Context } from "../types/index.js";
import { Slugify } from "../../helpers/slugify.js";

export const GenreMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_genre", {
      type: "Genre",
      args: { input: "GenreInput" },
      resolve: async (_, { input }, { prisma }: Context) => {
        return await prisma.genre.create({
          data: { name: input.name, slug: Slugify(input.name) },
        });
      },
    });
  },
});
