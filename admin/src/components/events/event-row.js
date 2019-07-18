import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import DragPreview from './event-drag-preview'
import { getEmptyImage } from 'react-dnd-html5-backend'

function EventRow({ event, handleClick }) {
  const [dnd, dragRef, preview] = useDrag({
    item: {
      type: 'event',
      id: event.id,
      DragPreview
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

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
