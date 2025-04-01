import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../helpers/server.js";

export const MediaMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteMedia", {
      type: "Media",
      args: { media_id: nonNull(idArg()) },
      resolve: async (_, { media_id }) => {
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
