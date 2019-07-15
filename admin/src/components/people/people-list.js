import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPeople, peopleSelector } from '../../ducks/people'
import PersonItem from './person-item'

class PeopleList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    return (
      <ul>
        {this.props.people.map((person) => (
          <PersonItem key={person.id} person={person} />
        ))}
      </ul>
    )
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  { fetchAllPeople }
)(PeopleList)
