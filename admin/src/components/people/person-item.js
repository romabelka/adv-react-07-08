import React from 'react'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'

function PersonItem({ person, addEventToPerson }) {
  const [dnd, dropRef] = useDrop({
    accept: 'event',
    drop(item) {
      addEventToPerson(item.id, person.id)
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      hovered: monitor.isOver()
    })
  })

  const borderColor = dnd.canDrop ? (dnd.hovered ? 'red' : 'green') : 'black'

  const dndStyle = {
    border: `1px solid ${borderColor}`
  }

  return (
    <li style={dndStyle} ref={dropRef}>
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
