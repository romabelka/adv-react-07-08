import React from 'react'
import { DragSource } from 'react-dnd'

function EventRow({ event, handleClick, connectDragSource, isDragging }) {
  const dndStyle = {
    opacity: isDragging ? 0.3 : 1
  }

  return connectDragSource(
    <tr
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

const spec = {
  beginDrag(props) {
    return {
      id: props.event.id
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default DragSource('event', spec, collect)(EventRow)
