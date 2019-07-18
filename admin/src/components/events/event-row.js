import React from 'react'
import { useDrag } from 'react-dnd'

function EventRow({ event, handleClick }) {
  const [dnd, dragRef] = useDrag({
    item: {
      id: event.id,
      type: 'event'
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const dndStyle = {
    opacity: dnd.isDragging ? 0.3 : 1
  }

  return (
    <tr
      data-id="event-row"
      onClick={() => handleClick(event.id)}
      style={dndStyle}
      ref={dragRef}
    >
      <td>{event.title}</td>
      <td>{event.when}</td>
      <td>{event.where}</td>
    </tr>
  )
}

EventRow.propTypes = {}

export default EventRow
