import { extendType, idArg, nonNull } from "nexus";
import { prisma } from "../../helpers/server.js";
import Authorization from "../../helpers/authorization.js";


export const ProfileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("update_profile", {
      type: "ProfilePayload",
      args: { input: nonNull("ProfileInput"), profile_id: nonNull(idArg()) },
      authorize: (parent, args, ctx) => {
        return Authorization(ctx);
      },
      resolve: async (
        _,
        { input: { contact_no, first_name, last_name }, profile_id }
      ) => {
        return await prisma.profile.update({
          data: {
            first_name,
            contact_no,
            last_name,
          },
          where: {
            profile_id,
          },
        });
      },
    });
  },
});
