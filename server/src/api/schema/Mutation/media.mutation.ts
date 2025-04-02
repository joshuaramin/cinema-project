import { extendType, idArg, nonNull } from "nexus";
import { Context } from "../types/index.js";

export const MediaMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteMedia", {
      type: "Media",
      args: { media_id: nonNull(idArg()) },
      resolve: async (_, { media_id }, { prisma }: Context) => {
        return await prisma.media.update({
          where: {
            media_id,
          },
          data: {
            is_deleted: false,
          },
        });
      },
    });
  },
});
