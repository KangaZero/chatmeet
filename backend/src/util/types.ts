import { ISODateString } from 'next-auth';
import { Prisma, PrismaClient } from '@prisma/client';
import { PubSub } from "graphql-subscriptions";
import { Context } from "graphql-ws/lib/server";
import { messagePopulated } from "../graphql/resolvers/message";
import {
    conversationPopulated,
    participantPopulated,
  } from "../graphql/resolvers/conversation";
/**
 * Server Configuration
 */
export interface GraphQLContext {
    session: Session | null;
    prisma: PrismaClient;
    pubsub: PubSub;
}


export interface Session {
    user?: User;
    expires: ISODateString;
}

export interface SubscriptionContext extends Context {
    connectionParams: {
      session?: Session;
    };
  }
/**
 * Users
 */
  export interface User {
    id: string;
    username: string;
    email: string;
    emailVerified: boolean;
    image: string;

}
export interface CreateUsernameResponse {
    success?: boolean;
    error?: string;
}
export interface CreateUserResponse {
    success?: boolean;
    error?: string;
}

/**
 * Conversations
 */

export type ConversationPopulated = Prisma.ConversationGetPayload<{
    include: typeof conversationPopulated;
  }>;
  
  export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
    include: typeof participantPopulated;
  }>;
  
  export interface ConversationUpdatedSubscriptionPayload {
    conversationUpdated: {
      conversation: ConversationPopulated;
    };
  }
  
  export interface ConversationDeletedSubscriptionPayload {
    conversationDeleted: ConversationPopulated;
  }
  

export interface CreateConversationResponse {
    conversationId: string | null;
}


export interface Conversation {
    id: String;
    latestMessage: Message | null;
    participants: Participant[];
    createdAt: number | ISODateString ;
    updatedAt: number | ISODateString | any;
}


/**
 *  Messages 
 * */ 
export interface Message {
    id: String;
    sender: User;
    body: String | null;
}


export interface SendMessageArguments {
    id: string;
    conversationId: string;
    senderId: string;
    body: string;
}


export interface MessageSentSubsciptionPayload {
    messageSent: MessagePopulated;
}

export type MessagePopulated = Prisma.MessageGetPayload<{
    include: typeof messagePopulated;
  }>;
/**
 *  Participants 
 * */ 
export interface Participant {
    id: String;
    username: string | null;
    user?: User;
    // hasSeenLatestMessage: boolean;
}