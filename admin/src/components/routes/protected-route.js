import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

function ProtectedRoute({ user, ...props }) {
  if (user == null) {
    return <Redirect to="/auth/sign-in" />
  }

  return <Route {...props} />
}

export default connect(({ auth }) => ({ user: auth.get('user') }))(
  ProtectedRoute
)
