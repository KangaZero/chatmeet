import {
  GraphQLContext,
  MessageSentSubsciptionPayload,
  MessagePopulated,
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
          include: messagePopulated,
          orderBy: {
            createdAt: "desc",
          },
        });

        return messages;
      } catch (error: any) {
        console.error("messages error", error);
        throw new GraphQLError(error?.message);
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
          include: messagePopulated
        });

        const participant = await prisma.conversationParticipant.findFirst({
            where: {
                userId,
                conversationId,
            }
        });

        if(!participant) {
            throw new GraphQLError("No participant found");
        }

        const { id: participantId } = participant;

        const conversationUpdated = await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: participantId,
                },
                data: {
                  hasSeenLatestMessage: true,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                },
              },
            },
          },
          include: conversationPopulated,
        });

        pubsub.publish(`MESSAGE_SENT`, {
          messageSent: newMessage,
        });

        pubsub.publish(`CONVERSATION_UPDATED`, {
            conversationUpdated
        })

        return true;
      } catch (error: any) {
        console.error("sendMessage error", error);
        throw new GraphQLError("Error sending message");
      }
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (_: any, __: any, context: GraphQLContext) => {
          const { pubsub } = context;

          return pubsub.asyncIterator(["MESSAGE_SENT"]);
        },
        (
          payload: MessageSentSubsciptionPayload,
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

export const messagePopulated = Prisma.validator<Prisma.MessageInclude>()({
    sender: {
      select: {
        id: true,
        username: true,
      },
    },
  });

export default resolvers;
