import { extendType } from "nexus";
import { Context } from "../types/index.js";
import { AWSUploader } from "../../helpers/aws.js";
import { Slugify } from "../../helpers/slugify.js";

export const MoviesMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_movies", {
      type: "MoviesPayload",
      args: { input: "MoviesInput", file: "Upload" },
      resolve: async (_, { input, file }, { prisma }: Context) => {
        const { createReadStream, filename, mimetype } = await file;

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
        
        const movies = await prisma.movie.create({
          data: {
            name: input.name,
            year: input.year,
            duration: input.duration,
            slug: Slugify(input.name),
            description: input.description,
            url: await AWSUploader(createReadStream, filename),
          },
        });

        return {
          __typename: "Movies",
          ...movies,
        };
      },
    });
  },
});
