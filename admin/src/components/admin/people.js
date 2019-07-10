import React from 'react'
import { connect } from 'react-redux'
import { peopleSelector } from '../../ducks/admin'

function People({ people }) {
  console.log('people--', people)
  return (
    <ul>
      {people.map(({ email, firstName, lastName }) => (
        <li key={email}>
          {firstName} {lastName} - {email}
        </li>
      ))}
    </ul>
  )
}

export default connect((state) => ({
  people: peopleSelector(state)
}))(People)
