import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'

function PersonItem({ person, connectDropTarget, canDrop, hovered }) {
  const borderColor = canDrop ? (hovered ? 'red' : 'green') : 'black'

  const dndStyle = {
    border: `1px solid ${borderColor}`
  }

  return connectDropTarget(
    <li style={dndStyle}>
      <h3>{person.email}</h3>
      <div>
        {person.firstName} {person.lastName}
      </div>
    </li>
  )
}

PersonItem.propTypes = {}

const spec = {
  drop(props, monitor) {
    props.addEventToPerson(monitor.getItem().id, props.person.id)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default connect(
  null,
  { addEventToPerson }
)(DropTarget(['event'], spec, collect)(PersonItem))
