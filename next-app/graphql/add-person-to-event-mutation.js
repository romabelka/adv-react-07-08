import gql from 'graphql-tag'

export default gql`
    mutation AddPersonToEvent($eventId: ID!, $name: String!) {
        addPersonToEvent(eventId: $eventId, name: $name) {
            id name
        }
    }
`
