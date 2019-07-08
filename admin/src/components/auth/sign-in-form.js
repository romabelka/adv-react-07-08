import React from 'react'
import {reduxForm, Field} from 'redux-form'

function SignInForm({ handleSubmit }) {
    return (
        <form onSubmit={handleSubmit}>
            Email: <Field name="email" component="input" />
            Password: <Field name="password" component="input" type="password"/>
            <button>Sign In</button>
        </form>
    )
}

SignInForm.propTypes = {
}

export default reduxForm({
    form: 'sign-in'
})(SignInForm)
