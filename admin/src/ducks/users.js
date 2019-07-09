import { appName } from '../config'
import { Record } from 'immutable'

window['immutable'] = require('immutable')

/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER = `${prefix}/ADD_USER`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  list: []
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_USER:
      return state.update('list', (list) => [payload, ...list])

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
export function addUser({ email }) {
  return {
    type: ADD_USER,
    payload: { email }
  }
}
