import { gql } from "apollo-server-core";

const typeDefs = gql`
 type SearchedUser {
    id: String
    username: String
  }

 type Query {
     searchUsers(username: String): [SearchedUser]
  }

#   type User {
#     id: String
#     name: String
#     username: String
#     email: String
#     emailVerified: Boolean
#     image: String
#   }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }

  type Mutation {
    createUsername(username: String): CreateUsernameResponse
  }

`;

export default typeDefs;
