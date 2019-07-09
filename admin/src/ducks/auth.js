import { appName } from '../config'
import { Record } from 'immutable'
import firebase from 'firebase/app'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`

export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  error: null,
  loading: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case SIGN_IN_START:
    case SIGN_UP_START:
      return state.set('loading', true)

    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state.set('loading', false).set('user', payload.user)

    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR:
      return state.set('loading', false).set('error', error)

    default:
      return state
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const signInSuccess = (user) => ({
  type: SIGN_IN_SUCCESS,
  payload: { user }
})

export function signIn(email, password) {
  return async (dispatch) => {
    dispatch({
      type: SIGN_IN_START
    })

    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      dispatch(signInSuccess(user))
    } catch (error) {
      dispatch({
        type: SIGN_IN_ERROR,
        error
      })
    }
  }
}

export function signUp(email, password) {
  return async (dispatch) => {
    dispatch({
      type: SIGN_UP_START
    })

    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      dispatch({
        type: SIGN_UP_ERROR,
        error
      })
    }
  }
}

firebase.auth().onAuthStateChanged((user) => {
  console.log('Auth state changed:', user)
})
