import React from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'

function PersonItem({ person, addEventToPerson }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'person', id: person.id },
    collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      }
    }
  })

  const [{ canDrop, hovered }, drop] = useDrop({
    accept: ['event'],
    collect: (monitor) => ({
      hovered: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop(item) {
      addEventToPerson(item.id, person.id)
    }
  })
  const borderColor = canDrop ? (hovered ? 'red' : 'green') : 'black'

  const dndStyle = {
    border: `1px solid ${borderColor}`,
    opacity: isDragging ? 0.3 : 1
  }

  return (
    <li ref={drop}>
      <div ref={drag} style={dndStyle}>
        <h3>{person.email}</h3>
        <div>
          {person.firstName} {person.lastName}
        </div>
      </div>
    </li>
  )
}

PersonItem.propTypes = {}

export default connect(
  null,
  { addEventToPerson }
)(PersonItem)
