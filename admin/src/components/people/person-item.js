import React, { useCallback, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { addEventToPerson } from '../../ducks/people'
import DragPreview from './person-drag-preview'
import { getEmptyImage } from 'react-dnd-html5-backend'

function PersonItem({ person, addEventToPerson }) {
  const [dropDnd, dropRef] = useDrop({
    accept: 'event',
    drop(item) {
      addEventToPerson(item.id, person.id)
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      hovered: monitor.isOver()
    })
  })

  const [_, dragRef, preview] = useDrag({
    item: {
      type: 'person',
      id: person.id,
      DragPreview
    }
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  const borderColor = dropDnd.canDrop
    ? dropDnd.hovered
      ? 'red'
      : 'green'
    : 'black'

  const dndStyle = {
    border: `1px solid ${borderColor}`
  }

  const dndRef = useCallback(
    (ref) => {
      dragRef(ref)
      dropRef(ref)
    },
    [dragRef, dropRef]
  )

  return (
    <li style={dndStyle} ref={dndRef}>
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
