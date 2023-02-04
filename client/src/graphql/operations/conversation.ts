/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

const ConversationFields = `
conversations {
    id
    updatedAt
    participants {
      user {
        id
        username
      }
      hasSeenLatestMessage
    }
    latestMessage {
      sender{
          id
          username
      }
    }
  }
`

export default {
  Queries: {
    conversations: gql`
      query Conversations {
       ${ConversationFields}
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};
