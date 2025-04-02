import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../helpers/server.js";
import Authorization from "../../helpers/authorization.js";
import { Context } from "../types/index.js";

export const ProfileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("update_profile", {
      type: "ProfilePayload",
      args: { input: nonNull("ProfileInput"), profile_id: nonNull(idArg()) },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (_, { input, profile_id }, { prisma }: Context) => {
        return await prisma.profile.update({
          data: {
            first_name: input.first_name,
            contact_no: input.contact_no,
            last_name: input.last_name,
          },
          where: {
            profile_id,
          },
        });
      },
    });
  },
});
