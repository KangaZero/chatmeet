import { gql, useQuery } from '@apollo/client';

export default {
    Queries:{
        searchUsers: gql`
        query SearchUsers($username: String!) {
            searchUsers(username: $username) {
                id
                username
            }
        }`
    },
    Mutations:{
        createUsername: gql`
            mutation CreateUserName($username: String!) {
                createUsername(username: $username) {
                    success
                    error
                }
            }
        `
    },
    Subscriptions: {},
}