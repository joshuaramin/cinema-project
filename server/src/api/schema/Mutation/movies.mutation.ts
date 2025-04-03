import { extendType, idArg, list, nonNull } from "nexus";
import { Context } from "../types/index.js";
import { AWSUploader } from "../../helpers/aws.js";
import { Slugify } from "../../helpers/slugify.js";

export const MoviesMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_movies", {
      type: "MoviesPayload",
      args: {
        input: "MoviesInput",
        file: "Upload",
        genre_id: nonNull(list(idArg())),
      },
      resolve: async (_, { input, file, genre_id}, { prisma }: Context) => {
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
            Genre: {
              connect: 
            }
          },
        });

        return {
          __typename: "Movies",
          ...movies,
        };
      },
    });
    t.field("update_movies", {
      type: "MoviesPayload",
      args: {
        input: "MoviesInput",
        file: "Upload",
        movies_id: nonNull(idArg()),
      },
      resolve: async (_, { input, file, movies_id }, { prisma }: Context) => {
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

        const movie = await prisma.movie.update({
          where: { movies_id },
          data: {
            name: input.name,
            year: input.year,
            duration: input.duration,
            slug: Slugify(input.name),
          },
        });

        return {
          __typename: "Movies",
          ...movie,
        };
      },
    });
    t.field("delete_movies", {
      type: "Movies",
      args: { movies_id: nonNull(idArg()) },
      resolve: async (_, { movies_id }, { prisma }: Context) => {
        return await prisma.movie.update({
          data: {
            is_deleted: true,
          },
          where: {
            movies_id,
          },
        });
      },
    });
  },
});
