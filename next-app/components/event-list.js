import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'

const query = gql`{
    allEvents { id title }
}`

function EventList() {
    return (
        <Query query={query}>
            {({data, loading}) => {
                if (loading) return <h1>Loading...</h1>
                return data.allEvents.map(event => (
                    <div key={event.id}>
                        <Link href={`/event?id=${event.id}`}>
                            <a>
                                {event.title}
                            </a>
                        </Link>
                    </div>
                ))
            }}
        </Query>
    )
}

EventList.propTypes = {
}

export default EventList
