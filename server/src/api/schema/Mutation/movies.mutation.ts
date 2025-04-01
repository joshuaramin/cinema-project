import { extendType } from "nexus";
import { Context } from "../types/index.js";
import { AWSUploader } from "../../helpers/aws.js";

export const MoviesMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_movies", {
      type: "Movies",
      args: { file: "Upload" },
      resolve: async (_, { file }, { prisma }: Context) => {
        const { createReadStream, filename } = await file;
        return await prisma.movie.create({
          data: {
            name: "",
            description: "",
            url: await AWSUploader(createReadStream(), filename),
          },
        });
      },
    });
  },
});
