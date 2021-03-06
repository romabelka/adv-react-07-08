import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PersonPage from './person-page'
import EventsPage from './events-page'
import AllPage from './all-page'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <Route path="/admin/people" component={PersonPage} />
        <Route path="/admin/events" component={EventsPage} />
        <Route path="/admin/all" component={AllPage} />
      </div>
    )
  }
}

export default AdminPage
