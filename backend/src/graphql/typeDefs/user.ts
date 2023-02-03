import { gql } from "apollo-server-core";

const typeDefs = gql`
    type SearcedUser {
        id: String
        username: String
    }
    type Query {
        searchUsers(username: String): [SearcedUser]
    }
    type Mutation {
        createUsername(username: String): CreateUsernameResponse
    }
    type CreateUsernameResponse {
        success: Boolean
        error: String
    }
`

export default typeDefs;
