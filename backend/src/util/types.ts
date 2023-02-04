import { ISODateString } from 'next-auth';
import { PrismaClient } from '@prisma/client';


export interface GraphQLContext {
    session: Session | null;
    prisma: PrismaClient;
    // pubusub
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

export interface CreateUsernameResponse {
    success?: boolean;
    error?: string;
}

export interface CreateConversationResponse {
    conversationId: string;
}