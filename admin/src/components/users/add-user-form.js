import React from 'react'
import { reduxForm, Field, reset } from 'redux-form'
import ErrorField from '../common/error-field'
import emailValidator from 'email-validator'

function AddUserForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" component={ErrorField} label="Email" />
      <button>add user</button>
    </form>
  )
}

const validate = ({ email }) => {
  const errors = {}

  if (!emailValidator.validate(email)) errors.email = 'email is invalid'

  return errors
}

export default reduxForm({
  form: 'add-user',
  validate,
  onSubmitSuccess: (result, dispatch) => dispatch(reset('add-user'))
})(AddUserForm)
