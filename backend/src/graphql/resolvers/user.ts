import { GraphQLContext, CreateUsernameResponse } from "../../util/types";



const resolvers = {
    Query: {
        searchUsers: () => {}
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
                const isUniqueUser: boolean = await prisma.user.findUnique({
                    where: {
                        username,
                    },
            });

            console.log(isUniqueUser)

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