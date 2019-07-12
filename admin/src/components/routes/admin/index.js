import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PersonPage from './person-page'
import ConferencesPage from './conferences-page'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <Route path="/admin/people" component={PersonPage} />
        <Route path="/admin/conferences" component={ConferencesPage} />
      </div>
    )
  }
}

export default AdminPage
