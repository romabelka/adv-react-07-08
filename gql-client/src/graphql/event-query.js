import gql from "graphql-tag";

export default gql`query Event($id: ID) {
    event(id: $id) {
        url
        people {
            id
            name
        }
    }
}`
