import React from 'react'

function ErrorField({ input, meta, label, ...rest }) {
  const { error, touched } = meta

  const errorText = touched && error && (
    <h3 style={{ color: 'red' }}>{error}</h3>
  )
  return (
    <div>
      {label}:
      <input {...input} {...rest} />
      {errorText}
    </div>
  )
}

ErrorField.propTypes = {}

export default ErrorField
