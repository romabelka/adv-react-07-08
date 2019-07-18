import React from 'react'
import { useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { deleteEvent } from '../../ducks/events'
import { deletePerson } from '../../ducks/people'

const style = {
  width: 100,
  height: 100,
  position: 'fixed',
  top: 0,
  right: 0
}

function Trash({ deleteEvent, deletePerson }) {
  const [dnd, dropRef] = useDrop({
    accept: ['event', 'person'],
    drop(item) {
      const itemACMapping = {
        event: deleteEvent,
        person: deletePerson
      }

      itemACMapping[item.type](item.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  const dndStyle = {
    border: `1px solid ${dnd.isOver ? 'green' : 'black'}`
  }
  return (
    <div style={{ ...style, ...dndStyle }} ref={dropRef}>
      Trash
    </div>
  )
}

export default connect(
  null,
  { deleteEvent, deletePerson }
)(Trash)
