import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import { signInSuccess } from '../ducks/auth'

export default (Component) =>
  connect(
    null,
    { signInSuccess }
  )((props) => {
    useEffect(() => {
      const listener = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          props.signInSuccess(user)
        } else {
          console.log('You have to sign up')
        }
      })
      return () => {
        listener()
      }
    }, [])
    return <Component {...props} />
  })
