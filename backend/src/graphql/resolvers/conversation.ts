import { GraphQLContext, CreateConversationResponse } from "../../util/types";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";

// import { conversationPopulated } from "../../../../server/src/graphql/resolvers/conversation";


const resolvers = {
    Mutation: {
        createConversation: async (
            _: any, 
            args: { participantIds: Array<string> }, 
            context: GraphQLContext
            ): Promise<CreateConversationResponse> => {

            const { participantIds } = args;
            const { prisma, session} = context;

            if (!session?.user) {
                throw new GraphQLError("Not authorised");
              }

              const {
                user: { id: userId },
              } = session;

              try {
                const conversation = await prisma.conversation.create({
                    data: {
                        participants: {
                            createMany: {
                                data: participantIds.map(id => ({
                                    userId: id,
                                    hasSeenLatestMessage: id === userId,
                                })),
                            },
                        },
                    },
                    include: {
                        participants: {
                          include: {
                            user: {
                              select: {
                                id: true,
                                username: true,
                              },
                            },
                          },
                        },
                        latestMessage: {
                          include: {
                            sender: {
                              select: {
                                id: true,
                                username: true,
                              },
                            },
                          },
                        },
                      }
                        // conversationPopulated,
                });

                return {
                    conversationId: conversation.id,
                };
                
              } catch (error: any) {
                console.log("searchUsers error", error);
              throw new GraphQLError(error?.message);
              }
            
        }
    },
};

// export const participantPopulated =
//   Prisma.validator<Prisma.ConversationParticipantInclude>()({
//     user: {
//       select: {
//         id: true,
//         username: true,
//       },
//     },
//   });

// export const conversationPopulated =
//   Prisma.validator<Prisma.ConversationInclude>()({
//     participants: {
//       include: participantPopulated,
//     },
//     latestMessage: {
//       include: {
//         sender: {
//           select: {
//             id: true,
//             username: true,
//           },
//         },
//       },
//     },
//   });



export default resolvers;