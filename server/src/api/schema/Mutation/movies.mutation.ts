import { extendType, idArg, list, nonNull } from "nexus";
import { Context } from "../types/index.js";
import { AWSUploader } from "../../helpers/aws.js";
import { Slugify } from "../../helpers/slugify.js";
import { DurationISO } from "../../helpers/duration.js";

export const MoviesMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_movies", {
      type: "MoviesPayload",
      args: {
        input: "MoviesInput",
        file: "Upload",
        genre_id: nonNull(list(nonNull(idArg()))),
      },
      resolve: async (
        _,
        { input, file, genre_id },
        { prisma, pubsub }: Context
      ) => {
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
            duration: DurationISO(input.duration),
            slug: Slugify(input.name),
            description: input.description,
            url: await AWSUploader(createReadStream, filename),
            release_date: input.release_date,
            Genre: {
              connect: genre_id.map((genre_id) => ({
                genre_id,
              })),
            },
          },
        });

        pubsub.publish("CREATE_MOVIES_SUB", movies);

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
        const { createReadStream, filename } = await file;
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
            duration: DurationISO(input.duration),
            slug: Slugify(input.name),
            url: await AWSUploader(createReadStream, filename),
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
