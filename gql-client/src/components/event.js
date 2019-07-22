import React from 'react'

function Event({ event }) {
    return (
        <div>
            <h3>{event.title}</h3>
        </div>
    )
}

Event.propTypes = {
}

export default Event
