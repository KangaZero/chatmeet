/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export const MessageFields = `
    id
    body
    sender {
        id
        username
    }
    createdAt
`;

export default {
  Queries: {
    messages: gql`
        query Messages($conversationId: String!) {
            messages(conversationId: $conversationId) {
                ${MessageFields}
        }
    },
      `,
  },
  Mutations: {
    sendMessage: gql`
        mutation sendMessage($id: String!, $conversationId: String!, $senderId: String! $body: String!) {
            sendMessage(id: $id, conversationId: $conversationId, senderId: $senderId, body: $body) 
        },
      `,
  },
  Subscriptions: {
    messageSent: gql`
        subscription MessageSent($conversationId: String!) {
            messageSent(conversationId: $conversationId) {
                ${MessageFields}
            }
        }
    `,
  },
};
