import {
  all,
  takeEvery,
  put,
  call,
  select,
  take,
  spawn
} from 'redux-saga/effects'
import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { createSelector } from 'reselect'
import { fbToEntities } from '../services/utils'
import api from '../services/api'
import { eventChannel } from 'redux-saga'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const DELETE_EVENT_REQUEST = `${prefix}/DELETE_EVENT_REQUEST`
export const DELETE_EVENT_START = `${prefix}/DELETE_EVENT_START`
export const DELETE_EVENT_SUCCESS = `${prefix}/DELETE_EVENT_SUCCESS`

export const REALTIME_EVENTS_UPDATE = `${prefix}/REALTIME_EVENTS_UPDATE`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap([])
})

export const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_START:
    case DELETE_EVENT_START:
      return state.set('loading', true)

    case FETCH_ALL_SUCCESS:
    case REALTIME_EVENTS_UPDATE:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case DELETE_EVENT_SUCCESS:
      return state.set('loading', false)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventListSelector = createSelector(
  entitiesSelector,
  (entities) => entities.valueSeq().toArray()
)

export const idSelector = (_, props) => props.id
export const eventSelector = createSelector(
  entitiesSelector,
  idSelector,
  (entities, id) => entities.get(id)
)
/**
 * Action Creators
 * */

export const fetchAllEvents = () => ({
  type: FETCH_ALL_REQUEST
})

export const deleteEvent = (id) => ({
  type: DELETE_EVENT_REQUEST,
  payload: { id }
})

/**
 * Sagas
 * */

const createChanel = () =>
  eventChannel((emit) =>
    api.subscribeForCollection('events', (events) => emit(events))
  )

export function* realtimeSyncSaga() {
  const chanel = yield call(createChanel)

  while (true) {
    const data = yield take(chanel)

    yield put({
      type: REALTIME_EVENTS_UPDATE,
      payload: data
    })
  }
}

export function* fetchAllSaga() {
  yield put({
    type: FETCH_ALL_START
  })

  const data = yield call(api.fetchAllEvents)

  yield put({
    type: FETCH_ALL_SUCCESS,
    payload: data
  })
}

export const deleteEventSaga = function*(action) {
  const { payload } = action
  if (yield select(loadingSelector)) {
    return
  }

  yield put({
    type: DELETE_EVENT_START
  })

  try {
    yield call(api.deleteEvent, payload.id)

    yield put({
      type: DELETE_EVENT_SUCCESS,
      payload
    })
  } catch (_) {}
}

export function* saga() {
  yield spawn(realtimeSyncSaga)

  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(DELETE_EVENT_REQUEST, deleteEventSaga)
  ])
}
