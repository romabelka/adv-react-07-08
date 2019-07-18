import React from 'react'
import { useDragLayer } from 'react-dnd'

const style = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  pointerEvents: 'none'
}

const collect = (monitor) => ({
  isDragging: monitor.isDragging(),
  item: monitor.getItem(),
  offset: monitor.getSourceClientOffset()
})

function CustomDragLayer() {
  const preview = useCustomPreview()

  return preview && <div style={style}>{preview}</div>
}

function useCustomPreview() {
  const { isDragging, item, offset } = useDragLayer(collect)

  if (!item || !isDragging || !offset) return null

  const { DragPreview, ...rest } = item

  if (!DragPreview) return null

  const transform = `translate(${offset.x}px, ${offset.y}px)`
  return (
    <div style={{ transform }}>
      <DragPreview {...rest} />
    </div>
  )
}

export default CustomDragLayer
