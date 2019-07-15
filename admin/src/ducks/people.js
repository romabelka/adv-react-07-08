import { appName } from '../config'
import { Record, List } from 'immutable'
import { takeEvery, put, call, all } from 'redux-saga/effects'
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

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([])
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
    case ADD_PERSON_SUCCESS:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload))
      )

    case FETCH_ALL_SUCCESS:
      return state.set('entities', fbToEntities(payload, PersonRecord))

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
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

export function* saga() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
  ])
}
