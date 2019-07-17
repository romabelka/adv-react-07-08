import React from 'react'
import { connect } from 'react-redux'
import { useDrop } from 'react-dnd'
import { removePerson } from '../../ducks/people'
import { removeEvent } from '../../ducks/events'

function Trash({ removePerson, removeEvent }) {
  const [{ canDrop, hovered }, drop] = useDrop({
    accept: ['event', 'person'],
    collect: (monitor) => ({
      hovered: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop({ type, id }) {
      if (type === 'person') {
        removePerson(id)
      } else if (type === 'event') {
        removeEvent(id)
      }
    }
  })
  const borderColor = canDrop ? (hovered ? 'red' : 'green') : 'black'

  const dndStyle = {
    display: `inline-block`,
    border: `2px solid ${borderColor}`
  }
  return (
    <div ref={drop} style={dndStyle}>
      Trash
    </div>
  )
}

export default connect(
  null,
  {
    removePerson,
    removeEvent
  }
)(Trash)
