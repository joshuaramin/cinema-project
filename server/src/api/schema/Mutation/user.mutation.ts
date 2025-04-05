import { extendType, idArg, nonNull } from "nexus";
import generateRandom from "../../helpers/generateRandom.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "../types/index.js";

const { sign } = jwt;
export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("create_user_account", {
      type: "UserPayload",
      args: {
        input: nonNull("UserInput"),
        address: nonNull("AddressInput"),
        user_role_id: nonNull(idArg()),
      },
      resolve: async (
        _,
        { input, address, user_role_id },
        { prisma }: Context
      ) => {
        const userEmail = await prisma.user.findUnique({
          where: {
            email: input.email,
          },
        });

        if (userEmail) {
          return {
            __typename: "ErrorObject",
            message: "Email Address already exist",
          };
        }

        const user = await prisma.user.create({
          data: {
            account_no: generateRandom(12),
            email: input.email,
            password: await bcrypt.hash(input.password, 12),
            Profile: {
              create: {
                contact_no: input.profile.contact_no,
                first_name: input.profile.first_name,
                last_name: input.profile.last_name,
                Address: {
                  create: {
                    address_line_1: address.address_line_1,
                    address_line_2: address.address_line_2,
                    city: address.city,
                    country: address.country,
                    zipcode: address.zipcode,
                  },
                },
              },
            },
            user_RoleUser_role_id: user_role_id,
          },
        });

        return {
          __typename: "User",
          ...user,
        };
      },
    });
    t.field("login", {
      type: "Credentials",
      args: { input: "AuthInput" },
      resolve: async (
        _,
        { input },
        { req, res, prisma }: Context
      ): Promise<any> => {
        return await prisma.$transaction(async () => {
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

          const userEmail = await prisma.user.findUnique({
            where: { email: input.email },
            include: {
              UserRole: true,
            },
          });

          if (!userEmail) {
            return {
              __typename: "ErrorObject",
              message: "Email Address does not exist",
            };
          }

          const valid = await bcrypt.compare(
            input.password,
            userEmail.password
          );

          if (!valid) {
            return {
              __typename: "ErrorObject",
              message: "Invalid Password",
            };
          }

          await prisma.activity_Logs.create({
            data: {
              title: "Logged In",
              description: "You logged in into your account",
              User: {
                connect: {
                  user_id: userEmail.user_id,
                },
              },
              type: "LOGGED IN",
            },
          });

          const token = sign(
            { user_id: userEmail.user_id, user_role: userEmail.UserRole?.name },
            "CMS_TEMPLATE",
            {
              algorithm: "HS512",
            }
          );

          res.cookie("access_token", token, {
            secure: true,
            httpOnly: false,
            sameSite: "none",
          });
          return {
            __typename: "token",
            token,
            user_id: userEmail.user_id,
            ...userEmail,
          };
        });
      },
    });
  },
});
