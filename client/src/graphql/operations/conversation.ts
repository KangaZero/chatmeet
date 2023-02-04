/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

const ConversationFields = `
conservations {
    id
    participants {
      id
      user {
        id
        username
      }
      hasSeenLatestMessage
    }
    latestMessage {
      id
      sender{
          id
          username
      }
      body
      createdAt
    }
    updatedAt
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
