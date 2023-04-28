import {graphql} from "relay-runtime";

export const GET_USERS_QUERY = graphql`
    query getUsersQuery(
        $first: Int
        $after: String
        $last: Int
        $before: String
    ) {
        getUsers(first: $first, after: $after, last: $last, before: $before) {
            edges {
                cursor
                node {
                    id
                    name
                    email
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
        }
    }
`;