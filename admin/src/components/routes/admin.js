import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import AddingPerson from '../admin/adding-person'
import { connect } from 'react-redux'
import { addPerson } from '../../ducks/admin'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <div>
          <NavLink activeStyle={{ color: 'red' }} to="/admin/adding-person">
            adding person
          </NavLink>
        </div>
        <Route path="/admin/adding-person" render={this.addingPerson} />
      </div>
    )
  }

  addingPerson = () => <AddingPerson onSubmit={this.handleAddingPerson} />

  handleAddingPerson = (person) => this.props.addPerson(person)
}

export default connect(
  null,
  {
    addPerson
  }
)(AdminPage)
