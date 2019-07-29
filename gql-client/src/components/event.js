import React, { useState } from 'react'
import {Query} from "react-apollo";
import PersonForm from "./person-form";
import eventQuery from '../graphql/event-query'

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
        <Query query={eventQuery} variables={{id: event.id}}>
            {({loading, data}) => {
                if (loading) return <h1>Loading...</h1>
                return (
                    <div>
                        <p>{data.event.url}</p>
                        <p>{data.event.people.map(person => person.name).join('; ')}</p>
                        <PersonForm event={event}/>
                    </div>

                )
            }}
        </Query>

    )
}

Event.propTypes = {}

export default Event
