import { GraphQLContext, CreateUsernameResponse, CreateUserResponse } from "../../util/types";
import { GraphQLError } from "graphql";
import { User } from "@prisma/client";


const resolvers = {
    Query: {
        searchUsers: async (
            _: any,
            args: { username: string },
            context: GraphQLContext
          ) => {
            const { username: searchedUsername } = args;
            const { session, prisma } = context;
      
            if (!session?.user) {
              throw new GraphQLError("Not authorized");
            }
      
            const {
              user: { username: myUsername },
            } = session;
      
            try {
              const users = await prisma.user.findMany({
                where: {
                  username: {
                    contains: searchedUsername,
                    not: myUsername,
                    mode: "insensitive",
                  },
                },
              });
      
              return users;
            } catch (error: any) {
              console.log("searchUsers error", error);
            //   throw new GraphQLError(error?.message);
              console.error(error)
            }
          },
        },
    Mutation: {
        createUsername: async (_: any, args: { username: string }, context: GraphQLContext): Promise<CreateUsernameResponse> => {
            const { username } = args
            const { prisma, session} = context;

            if (!session?.user) {
                return {
                    error: "Not authorised"
                };
            };

            const { id: userId } = session.user;

            try {
                // Is username unique?
                const isUniqueUser = await prisma.user.findUnique({
                    where: {
                        username,
                    },
            });
                    // if the field is empty
                if (username === '' || null){
                    return {
                        error: "Field is blank, please try again."
                    }
                }

            console.log('isUniqueUer from createUsername', isUniqueUser)

                if (isUniqueUser) {
                    return {
                        error: "Username already taken!"
                    };
                }

                // if not update user

                await prisma.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        username,
                    }
                });

                return{ success: true};
            } catch (error: any) {
                console.error("createUsername Mutation Err", error);
                return {
                    error
                }
            }


        }
    },
    // Subscription: {}
};

export default resolvers;