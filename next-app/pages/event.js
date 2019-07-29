import React from 'react'
import EventList from "../components/event-list";

function EventPage({ event }) {
    return (
        <div>
          <h1>{event.title}</h1>
            <EventList />
        </div>
    )
}

const eventQuery = `
    query Event($id: ID) {
        event(id: $id) {
            title
            url
            people {
                id
                name
            }
        }
    }
`

EventPage.getInitialProps = async ({ query }) => {
    const res = await fetch('http://localhost:5000' , {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            query: eventQuery,
            variables: { id: query.id }
        })
    })

    const { data: { event }} = await res.json()


    return { event }
}

export default EventPage
