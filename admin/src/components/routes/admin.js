import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddUserForm from '../users/add-user-form'
import UsersList from '../users/users-list'

import { addUser } from '../../ducks/users'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    const {
      users: { list }
    } = this.props

    return (
      <div>
        <h1>Admin</h1>

        <AddUserForm onSubmit={this.handleAddUser} />

        <UsersList users={list} />
      </div>
    )
  }

  handleAddUser = (user) => this.props.addUser(user)
}

export default connect(
  ({ users }) => ({ users }),
  { addUser }
)(AdminPage)
