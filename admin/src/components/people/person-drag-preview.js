import React from 'react'
import { connect } from 'react-redux'
import { personSelector } from '../../ducks/people'

function PersonDragPreview({ person }) {
  return (
    <div>
      <h2>{person.email}</h2>
    </div>
  )
}

export default connect((state, props) => ({
  person: personSelector(state, props)
}))(PersonDragPreview)
