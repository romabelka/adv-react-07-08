import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import AuthPage from './components/routes/auth'
import AdminPage from './components/routes/admin'
import ProtectedRoute from './components/common/protected-route'
import CustomDragLayer from './components/common/cutom-drag-layer'
import Trash from './components/common/trash'

class App extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/admin/people" activeStyle={{ color: 'red' }}>
                People List
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth" activeStyle={{ color: 'red' }}>
                auth
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeStyle={{ color: 'red' }}>
                admin
              </NavLink>
            </li>
          </ul>
        </nav>
        <section>
          <Route path="/auth" component={AuthPage} />
          <ProtectedRoute path="/admin" component={AdminPage} />
        </section>
        <CustomDragLayer />
        <Trash />
      </div>
    )
  }
}

export default App
