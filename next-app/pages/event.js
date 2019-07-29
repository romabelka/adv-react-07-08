import React from 'react'

function EventPage({ event }) {
    return (
        <div>
          <h1>{event.title}</h1>
        </div>
    )
}

const query = `
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

EventPage.getInitialProps = async () => {
    console.log(123)

    const res = await fetch('http://localhost:5000' , {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            query,
            variables: { id: '25yW1tqFogDRCAcPtLQA'}
        })
    })

    const { data: { event }} = await res.json()


    return { event }
}

export default EventPage
