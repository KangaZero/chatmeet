import userTypeDefs from "./user";
import conversationTypeDefs from "./conversation";

import merge from "lodash.merge";
import { gql } from "apollo-server-express";

const typeDefs = gql`
    scalar Date

  type Query {
    # conversations: [Conversation]
    searchUsers(username: String): [SearchedUser]
  }
# Have to declare individual Query types or else graphql will throw an error saying not defined in typeDefs
  type Query{
    conversations: [Conversation]
  }

  type Subscription{
    conversationCreated: Conversation
  }

  type Mutation {
    createUsername(username: String): CreateUsernameResponse
    createConversation(participantIds: [String]): CreateConversationResponse
  }


  type Message {
    id: String
    sender: User
    body: String
    createdAt: Date

  }
# Dates don't exist in GraphQL so we have to make a scalar type
  type Conversation {
    id: String
    latestMessage: Message
    participants: [Participant]
    createdAt: Date
    updatedAt: Date
  }

  type User {
    id: String
    name: String
    username: String
    email: String
    emailVerified: Boolean
    image: String
  }

  type Participant {
    id: String
    user: User
    hasSeenLatestMessage: Boolean
  }

  type CreateConversationResponse {
    conversationId: String
  }

  type SearchedUser {
    id: String
    username: String
  }
  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;

// const typeDefs = merge(null, conversationTypeDefs, userTypeDefs)

// console.log(typeDefs)
// // ^?

export default typeDefs;
