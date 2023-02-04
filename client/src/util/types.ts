
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

export interface SearchConversationsData {
    id: string;
    participants: Array<ParticipantData>;

}
export interface ParticipantData {
    id: string;
    user: UserData;
}

export interface UserData {
    id: string;
    name: string;
    username: string;
    email: string;
    emailVerified: boolean;
    image: string;
}

export interface CreateConversationData {
    createConversation: {
      conversationId: string;
    };
  }
