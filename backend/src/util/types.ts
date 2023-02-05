import { ISODateString } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { Context } from 'graphql-ws/lib/server'

/**
 * Server configuration
 */



export interface GraphQLContext {
    session: Session | null;
    prisma: PrismaClient;
    pubsub: PubSub;
}

export interface User {
    id: string;
    username: string;
    email: string;
    emailVerified: boolean;
    image: string;

}

export interface Session {
    user?: User;
    expires: ISODateString;
}

export interface SubscriptionContext extends Context{
    connectionParams: {
        session?: Session;
    }
}

export interface CreateUsernameResponse {
    success?: boolean;
    error?: string;
}

export interface CreateConversationResponse {
    conversationId: string | null;
}

/**
 *  Conversations 
 * */ 

export interface Conversation {
    id: String;
    latestMessage: Message | null;
    participants: Participant[] | null;
    createdAt: ISODateString | null;
    updatedAt: ISODateString | null;
}


/**
 *  Messages 
 * */ 
export interface Message {
    id: String | null;
    sender: User | null;
}

/**
 *  Participants 
 * */ 
export interface Participant {
    id: String | null;
    user: User | null;
    hasSeenLatestMessage: boolean | null;
}


