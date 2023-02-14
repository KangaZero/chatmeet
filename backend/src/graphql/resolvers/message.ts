import {
  GraphQLContext,
  MessageSentSubsciptionPayload,
  SendMessageArguments,
} from "../../util/types";
import { conversationPopulated } from "./conversation";
import { GraphQLError } from "graphql";
import { Prisma } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { userIsConversationParticipant } from "../../util/functions";

const resolvers = {
  Query: {
    messages: async ( _: any, args: { conversationId: string }, ctx: GraphQLContext): Promise<Prisma.MessageGetPayload<null>[]> => {
      const { prisma, session } = ctx;
      const { conversationId } = args;

      if (!session?.user) {
        throw new GraphQLError("Not authorised");
      }

      const { id: userId } = session?.user;


      const conversation = await prisma.conversation.findUnique({
        where: {
            id: conversationId,
        }, 
        include: conversationPopulated
      });

      if (!conversation) {
        throw new GraphQLError("No conversation found");
        }

        const allowedToView = userIsConversationParticipant(conversation.participants, userId);

        if (!allowedToView) {
            throw new GraphQLError("Not authorised");
        }

      try {
        const messages = await prisma.message.findMany({
          where: {
            conversationId,
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          }
        });

        return messages;
      } catch (error: any) {
        console.error("messages error", error);
        return [];
      }
    },
  },
  Mutation: {
    sendMessage: async (
      _: any,
      args: SendMessageArguments,
      ctx: GraphQLContext
    ): Promise<boolean> => {
      const { prisma, session, pubsub } = ctx;

      if (!session?.user) {
        throw new GraphQLError("Not authorised");
      }

      const { id: userId } = session?.user;
      const { id: messageId, senderId, conversationId, body } = args;

      if (userId !== senderId) {
        throw new GraphQLError("Not authorised");
      }

      try {
        const newMessage = await prisma.message.create({
          data: {
            id: messageId,
            senderId,
            conversationId,
            body,
          },
          include: {
            sender: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        });

        const conversationUpdated = await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: senderId,
                },
                data: {
                  hasSeenLatestMessage: true,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId: senderId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                },
              },
            },
          },
        });

        pubsub.publish(`MESSAGE_SENT`, {
          messageSent: newMessage,
        });

        // pubsub.publish(`CONVERSATION_UPDATED`, {
        //     conversationUpdated
        // })

        return true;
      } catch (error: any) {
        console.error("sendMessage error", error);
        return false;
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;

          try {
            return pubsub.asyncIterator(["MESSAGE_SENT"]);
          } catch (error: any) {
            console.error("messageSent error", error);
            throw new GraphQLError(error);
          }
        },
        (
          payload,
          args: { conversationId: string },
          context: GraphQLContext
        ) => {
          return payload.messageSent.conversationId === args.conversationId;
          // const { session } = context;
          // const { messageSent} = payload;
        }
      ),
    },
  },
};

// export const messagePopulated = 
//   Prisma.validator<Prisma.MessageArgs>()({

export default resolvers;
