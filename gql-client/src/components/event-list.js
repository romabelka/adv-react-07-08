import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Event from "./event";

const query = gql`{
    allEvents { id title }
}`

function EventList() {
    return (
        <Query query={query}>
            {({data, loading}) => {
                if (loading) return <h1>Loading...</h1>
                return data.allEvents.map(event => <Event key={event.id} event={event}/>)
            }}
        </Query>
    )
}

EventList.propTypes = {
}

export default EventList
