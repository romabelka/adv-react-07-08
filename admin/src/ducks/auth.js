import { appName } from '../config'
import {
  all,
  takeEvery,
  take,
  call,
  put,
  delay,
  spawn
} from 'redux-saga/effects'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import api from '../services/api'
import { eventChannel } from 'redux-saga'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`

export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`

export const SIGN_IN_ERROR_LIMIT = `${prefix}/SIGN_IN_ERROR_LIMIT`
export const SIGN_IN_ERROR_LIMIT_CLEAR = `${prefix}/SIGN_IN_ERROR_LIMIT_CLEAR`

export const REALTIME_SIGN_IN_SUCCESS = `${prefix}/REALTIME_SIGN_IN_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action

  switch (type) {
    case SIGN_IN_START:
    case SIGN_UP_START:
      return state.set('loading', true)

    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case REALTIME_SIGN_IN_SUCCESS:
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

export const userSelector = (state) => state[moduleName].user
export const isAuthorizedSelector = createSelector(
  userSelector,
  (user) => !!user
)

/**
 * Action Creators
 * */

export function signIn(email, password) {
  return {
    type: SIGN_IN_REQUEST,
    payload: { email, password }
  }
}

export function signUp(email, password) {
  return {
    type: SIGN_UP_REQUEST,
    payload: { email, password }
  }
}

/**
 * Init logic
 */

/**
 *Sagas
 **/

const createChanel = () =>
  eventChannel((emit) => api.subscribeForAuth((user) => emit(user)))

export function* realtimeAuthSaga() {
  const chanel = yield call(createChanel)

  while (true) {
    const user = yield take(chanel)

    yield put({
      type: REALTIME_SIGN_IN_SUCCESS,
      payload: { user }
    })
  }
}

export function* signInSaga() {
  let errors = 0

  while (true) {
    if (errors > 2) {
      yield put({
        type: SIGN_IN_ERROR_LIMIT
      })

      yield delay(4000)

      yield put({
        type: SIGN_IN_ERROR_LIMIT_CLEAR
      })

      errors = 0
    }

    const { payload } = yield take(SIGN_IN_REQUEST)

    yield put({
      type: SIGN_IN_START
    })

    try {
      const user = yield call(api.signIn, payload.email, payload.password)

      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error
      })

      errors++
    }
  }
}

export function* signUpSaga({ payload }) {
  yield put({
    type: SIGN_UP_START
  })

  try {
    const user = yield call(api.signUp, payload.email, payload.password)

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error
    })
  }
}

export function* saga() {
  yield spawn(realtimeAuthSaga)
  yield all([signInSaga(), takeEvery(SIGN_UP_REQUEST, signUpSaga)])
}
