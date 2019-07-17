import React from 'react'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'

function PersonItem({ person, addEventToPerson }) {
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
    border: `1px solid ${borderColor}`
  }

  return (
    <li ref={drop} style={dndStyle}>
      <h3>{person.email}</h3>
      <div>
        {person.firstName} {person.lastName}
      </div>
    </li>
  )
}

PersonItem.propTypes = {}

export default connect(
  null,
  { addEventToPerson }
)(PersonItem)
