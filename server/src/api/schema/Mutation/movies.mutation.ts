import { extendType } from "nexus";
import { Context } from "../types/index.js";
import { AWSUploader } from "../../helpers/aws.js";
import { Slugify } from "../../helpers/slugify.js";

export const MoviesMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_movies", {
      type: "Movies",
      args: { input: "MoviesInput", file: "Upload" },
      resolve: async (_, { input, file }, { prisma }: Context) => {
        const { createReadStream, filename } = await file;

        for(const key in input) {

        }

        return await prisma.movie.create({
          data: {
            name: input.name,
            slugify: Slugify(input.name),
            description: input.description,
            url: await AWSUploader(createReadStream(), filename),
          },
        });
      },
    });
  },
});
