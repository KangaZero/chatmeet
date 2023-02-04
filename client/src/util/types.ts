import { Conversation } from '../../../backend/src/util/types'

export interface CreateUsernameData {
    createUsername: {
    success: boolean;
    error: string;
    };
}

export interface CreateUsernameVariables {
    username: string;
}

export interface SearchUsersInput {
    username: string
}

export interface SearchedUsers {
    id: string;
    username: string;
}

export interface SearchUsersData {
    searchUsers: Array<SearchedUsers>
}


/**
 *  Conversations 
 * */ 
export interface ConversationsData {
    conversations: Array<Conversation>;

}

export interface CreateConversationData {
    createConversation: {
      conversationId: string;
    };
  }
