import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'
import { signIn, signUp } from '../../ducks/auth'

class AuthPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <div>
          <NavLink activeStyle={{ color: 'red' }} to="/auth/sign-in">
            sign in
          </NavLink>
        </div>
        <div>
          <NavLink activeStyle={{ color: 'red' }} to="/auth/sign-up">
            sign up
          </NavLink>
        </div>
        <Route path="/auth/sign-in" render={this.signInForm} />
        <Route path="/auth/sign-up" render={this.signUpForm} />
      </div>
    )
  }

  signInForm = () => <SignInForm onSubmit={this.handleSignIn} />
  signUpForm = () => <SignUpForm onSubmit={this.handleSignUp} />

  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}

export default connect(
  null,
  { signIn, signUp }
)(AuthPage)
