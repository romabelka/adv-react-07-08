import React, { useState } from 'react'
import gql from 'graphql-tag'
import {Query} from "react-apollo";

const query = gql`query Event($id: ID) {
    event(id: $id) {
        url
        people {
            id
            name
        }
    }
}`

function Event({event}) {
    const [isOpen, setOpen] = useState(false)
    return (
        <div>
            <h3>{event.title}</h3>
            {isOpen && getBody(event)}
            <button onClick={() => setOpen(!isOpen)}>open/close</button>
        </div>
    )
}


function getBody(event) {
    return (
        <Query query={query} variables={{id: event.id}}>
            {({loading, data}) => {
                if (loading) return <h1>Loading...</h1>
                return (
                    <div>
                        <p>{data.event.url}</p>
                        <p>{data.event.people.map(person => person.name).join('; ')}</p>
                    </div>

                )
            }}
        </Query>

    )
}

Event.propTypes = {}

export default Event
