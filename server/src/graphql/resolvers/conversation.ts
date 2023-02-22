import { GraphQLContext, CreateConversationResponse, Conversation } from "../../util/types";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";
import { withFilter } from 'graphql-subscriptions';

// import { conversationPopulated } from "../../../../server/src/graphql/resolvers/conversation";


const resolvers = {
    Query: {
      conversations: async (
        _:any, __:any, ctx: GraphQLContext)=> {

          const { prisma, session} = ctx;

          if (!session?.user) {
            throw new GraphQLError("Not authorised");
          }

          const {
            user: { id: userId },
          } = session;

         try {
          const conversations = await prisma.conversation.findMany({
            where: {
              participants: {
                some: {
                  userId: {
                    equals: userId,
                  }
                }
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
          })

          return conversations.filter(conversation => !!conversation.participants.find(p => p.userId === userId));
          
         } catch (error: any) {
          console.log("searchUsers error", error);
          throw new GraphQLError(error);
         }
    },
  },
    Mutation: {
        createConversation: async (
            _: any, 
            args: { participantIds: Array<string> }, 
            context: GraphQLContext
            ): Promise<{conversationId: string}> => {

            const { participantIds } = args;
            const { prisma, session, pubsub} = context;

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

                pubsub.publish('CONVERSATION_CREATED', {
                  conversationCreated: conversation,
                })

                return {
                    conversationId: conversation.id,
                };
                
              } catch (error: any) {
                console.log("searchUsers error", error);
              throw new GraphQLError(error?.message);
              }
            
        }
    },
    Subscription: {
        conversationCreated: {
            subscribe: withFilter((_: any, __: any, context: GraphQLContext) => {
              
              const { pubsub } = context;
            
              try {
                return pubsub.asyncIterator(['CONVERSATION_CREATED'])
              } catch (error: any) {
                console.log("conversationCreated error", error);
                throw new GraphQLError(error);
              }
            },
            (payload, _ , context: GraphQLContext) => {
              const { session } = context;
              const { conversationCreated: { participants }} = payload

              const userIsParticipant = !!participants.find((p: any) => p.userId === session?.user?.id);

              return userIsParticipant;
            }
          )
          },
},
};

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
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
  });



export default resolvers;