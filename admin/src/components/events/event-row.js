import React from 'react'

function EventRow({ event, handleClick }) {
  return (
    <tr data-id="event-row" onClick={() => handleClick(event.id)}>
      <td>{event.title}</td>
      <td>{event.when}</td>
      <td>{event.where}</td>
    </tr>
  )
}

EventRow.propTypes = {}

export default EventRow
