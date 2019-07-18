import React from 'react'
import { connect } from 'react-redux'
import { eventSelector } from '../../ducks/events'

function EventDragPreview({ event }) {
  return (
    <div>
      <h1 style={{ color: 'red' }}>{event.title}</h1>
    </div>
  )
}

export default connect((state, props) => ({
  event: eventSelector(state, props)
}))(EventDragPreview)
