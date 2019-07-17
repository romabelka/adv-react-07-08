import React, { useEffect } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd'

function EventRow({ event, handleClick }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: `event`, id: event.id },
    collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      }
    }
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  const dndStyle = {
    opacity: isDragging ? 0.3 : 1
  }

  return (
    <tr
      ref={drag}
      data-id="event-row"
      onClick={() => handleClick(event.id)}
      style={dndStyle}
    >
      <td>{event.title}</td>
      <td>{event.when}</td>
      <td>{event.where}</td>
    </tr>
  )
}

EventRow.propTypes = {}

export default EventRow
