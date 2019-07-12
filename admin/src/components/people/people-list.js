import React, { Component } from 'react'
import { connect } from 'react-redux'
import { peopleSelector } from '../../ducks/people'
import { getPeople } from '../../ducks/people'
import Loading from '../common/loading'

class PeopleList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.getPeople()
  }

  render() {
    const {
      people: { loading, entities }
    } = this.props
    return loading ? (
      <Loading />
    ) : (
      <div>
        {entities.map((person) => (
          <li key={person.id}>
            {person.firstName}: {person.email}
          </li>
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  {
    getPeople
  }
)(PeopleList)
