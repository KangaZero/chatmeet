import { ConversationPopulated, MessagePopulated } from '../../../backend/src/util/types'


/**
 *  Users 
 * */ 
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
 * Messages
 */
export interface MessagesData {
    messages: Array<MessagePopulated>;
  }
  
  export interface MessagesVariables {
    conversationId: string;
  }
  
//   export interface SendMessageVariables {
//     id: string;
//     conversationId: string;
//     senderId: string;
//     body: string;
//   }
  
//   export interface MessagesSubscriptionData {
//     subscriptionData: {
//       data: {
//         messageSent: MessagePopulated;
//       };
//     };
//   }

/**
 *  Conversations 
 * */ 
export interface ConversationsData {
    conversations: Array<ConversationPopulated>;
  }

export interface CreateConversationData {
    createConversation: {
      conversationId: string;
    };
  }

  export interface ConversationCreatedSubscriptionData {
    subscriptionData: {
      data: {
        conversationCreated: ConversationPopulated;
      };
    };
  }