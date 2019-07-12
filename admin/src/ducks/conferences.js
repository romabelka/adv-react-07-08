import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import { put, takeEvery, call } from 'redux-saga/effects'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'conferences'
const prefix = `${appName}/${moduleName}`
export const GET_CONFERENCES_START = `${prefix}/GET_CONFERENCES_START`
export const GET_CONFERENCES_SUCCESS = `${prefix}/GET_CONFERENCES_SUCCESS`
export const GET_CONFERENCES_FAIL = `${prefix}/GET_CONFERENCES_FAIL`
export const GET_CONFERENCES_REQUEST = `${prefix}/GET_CONFERENCES_REQUEST`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([]),
  loading: false,
  error: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action

  switch (type) {
    case GET_CONFERENCES_START:
      return state.set('loading', true)

    case GET_CONFERENCES_FAIL:
      return state.set('loading', false).set('error', error)

    case GET_CONFERENCES_SUCCESS:
      return state
        .set('entities', new List(payload.conferences))
        .set('loading', false)

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const conferenceSelector = createSelector(
  stateSelector,
  (state) => state
)

/**
 * Action Creators
 * */

export function getConferences() {
  return {
    type: GET_CONFERENCES_REQUEST
  }
}

/**
 * Sagas
 **/

export function* getConferencesSaga() {
  yield put({
    type: GET_CONFERENCES_START
  })
  try {
    const conferences = yield call(api.getDataFromCollection, 'events')
    yield put({
      type: GET_CONFERENCES_SUCCESS,
      payload: {
        conferences
      }
    })
  } catch (error) {
    yield put({
      type: GET_CONFERENCES_FAIL,
      error
    })
    throw error
  }
}

export function* saga() {
  yield takeEvery(GET_CONFERENCES_REQUEST, getConferencesSaga)
}
