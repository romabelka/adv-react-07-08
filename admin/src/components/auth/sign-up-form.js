import React from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import emailValidator from 'email-validator'

function SignUpForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" component={ErrorField} label="Email" />
      <Field
        name="password"
        component={ErrorField}
        type="password"
        label="Password"
      />
      <button>Sign Up</button>
    </form>
  )
}

SignUpForm.propTypes = {}

const validate = ({ email, password }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  else if (!emailValidator.validate(email)) errors.email = 'email is invalid'
  if (!password) errors.password = 'password is a required field'
  else if (password.length < 8) errors.password = 'password is to short'

  return errors
}

export default reduxForm({
  form: 'sign-up',
  validate
})(SignUpForm)
