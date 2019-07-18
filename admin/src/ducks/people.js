import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import {
  takeEvery,
  put,
  call,
  all,
  delay,
  fork,
  spawn,
  cancel,
  cancelled,
  race,
  take
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import api from '../services/api'
import { fbToEntities } from '../services/utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const ADD_EVENT_TO_PERSON = `${prefix}/ADD_EVENT_TO_PERSON`

export const DELETE_PERSON_REQUEST = `${prefix}/DELETE_PERSON_REQUEST`
export const DELETE_PERSON_SUCCESS = `${prefix}/DELETE_PERSON_SUCCESS`

export const REALTIME_SYNC_UPDATE = `${prefix}/REALTIME_SYNC_UPDATE`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new OrderedMap([])
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case REALTIME_SYNC_UPDATE:
    case FETCH_ALL_SUCCESS:
      return state.set('entities', fbToEntities(payload, PersonRecord))

    case DELETE_PERSON_SUCCESS:
      return state.deleteIn(['entities', payload.id])

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = (state) => stateSelector(state).entities
export const peopleSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)

export const idSelector = (_, props) => props.id
export const personSelector = createSelector(
  entitiesSelector,
  idSelector,
  (entities, id) => entities.get(id)
)
/**
 * Action Creators
 * */

export const addPerson = (person) => ({
  type: ADD_PERSON_REQUEST,
  payload: { person }
})

export const fetchAllPeople = () => ({
  type: FETCH_ALL_REQUEST
})

export const addEventToPerson = (eventId, personId) => ({
  type: ADD_EVENT_TO_PERSON,
  payload: { eventId, personId }
})

export const deletePerson = (id) => ({
  type: DELETE_PERSON_REQUEST,
  payload: { id }
})

/**
 * Sagas
 */

export function* addPersonSaga(action) {
  yield put({
    type: ADD_PERSON_START,
    payload: { ...action.payload.person }
  })

  const { id } = yield call(api.addPerson, action.payload.person)

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: { id, ...action.payload.person }
  })

  yield put(reset('person'))
}

export function* fetchAllSaga() {
  const data = yield call(api.loadAllPeople)

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  })
}

export function* deletePersonSaga({ payload }) {
  try {
    yield call(api.deletePerson, payload.id)

    yield put({
      type: DELETE_PERSON_SUCCESS,
      payload
    })
  } catch (_) {}
}

export function* syncWithPollingSaga() {
  let i = 0
  try {
    while (true) {
      if (i++ >= 10) throw new Error('some network error')
      yield call(fetchAllSaga)
      yield delay(1000)
    }
  } finally {
    if (yield cancelled()) {
      console.log('---', 'saga was cancelled')
    }
  }
}

export function* cancellableSyncSaga() {
  yield race({
    sync: syncWithPollingSaga(),
    timeout: delay(5000)
    /*
    logout: whatchLogout(),
    routeChanged: watchRouteChanged(),
    stopBtnClick: watchStopButton()
*/
  })
  /*
  const sync = yield fork(syncWithPollingSaga)
  yield delay(5000)
  yield cancel(sync)
*/
}

export function* retryWithExponentialIntervals(saga) {
  for (let i = 1; i <= 4; i++) {
    try {
      return yield call(saga)
    } catch {
      yield delay(Math.pow(500, i))
    }
  }
}

const createChanel = () =>
  eventChannel((emit) => api.subscribeForPeople((people) => emit(people)))

export function* realtimeSyncSaga() {
  const chanel = yield call(createChanel)

  while (true) {
    const data = yield take(chanel)

    yield put({
      type: REALTIME_SYNC_UPDATE,
      payload: data
    })
  }
}

export function* saga() {
  yield spawn(realtimeSyncSaga)

  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga)
  ])
}
