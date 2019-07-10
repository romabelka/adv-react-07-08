import React from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import emailValidator from 'email-validator'
import People from './people'

function AddingPerson({ handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field name="email" component={ErrorField} label="Email" />
        <Field name="firstName" component={ErrorField} label="First name" />
        <Field name="lastName" component={ErrorField} label="Last name" />
        <button>Add a person</button>
      </form>
      <People />
    </>
  )
}

AddingPerson.propTypes = {}

const validate = ({ email, firstName, lastName }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  else if (!emailValidator.validate(email)) errors.email = 'email is invalid'
  if (!firstName) errors.firstName = 'first name is a required field'
  if (!lastName) errors.lastName = 'last name is a required field'

  return errors
}

export default reduxForm({
  form: 'adding-person',
  validate
})(AddingPerson)
