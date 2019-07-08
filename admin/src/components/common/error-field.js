import React from 'react'

function ErrorField({ input, meta, label }) {
    const {error, touched} = meta

    const errorText = touched && error && <h3 style={{ color: 'red'}}>{error}</h3>
    return (
        <div>
            {label}:
            <input {...input} />
            {errorText}
        </div>
    )
}

ErrorField.propTypes = {
}

export default ErrorField
