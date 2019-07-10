import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'admin'
const prefix = `${appName}/${moduleName}`

const START = `_START`
const FAIL = `_FAIL`
const SUCCESS = `_SUCCESS`
export const ADD_PERSON = `${prefix}/ADD_PERSON`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  people: List(),
  error: null,
  loading: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case ADD_PERSON + START:
      return state.set('loading', true)

    case ADD_PERSON + SUCCESS:
      return state
        .set('people', state.people.push(payload.person))
        .set('loading', false)

    case ADD_PERSON + FAIL:
      return state.set('error', error).set('loading', false)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const peopleSelector = (state) => state.admin.people

/**
 * Action Creators
 * */

export const addPerson = (person) => (dispatch) => {
  dispatch({
    type: ADD_PERSON + SUCCESS,
    payload: { person }
  })
  dispatch(reset('adding-person'))
}
