import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { put, takeEvery, call, all } from 'redux-saga/effects'
import { generateId } from '../services/utils'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_FAIL = `${prefix}/ADD_PERSON_FAIL`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`

export const GET_PEOPLE_START = `${prefix}/GET_PEOPLE_START`
export const GET_PEOPLE_SUCCESS = `${prefix}/GET_PEOPLE_SUCCESS`
export const GET_PEOPLE_FAIL = `${prefix}/GET_PEOPLE_FAIL`
export const GET_PEOPLE_REQUEST = `${prefix}/GET_PEOPLE_REQUEST`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([]),
  loading: false
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload, error } = action

  switch (type) {
    case ADD_PERSON_START:
      return state.set('loading', true)

    case ADD_PERSON_FAIL:
      return state.set('loading', false).set('error', error)

    case ADD_PERSON_SUCCESS:
      return state
        .update('entities', (entities) =>
          entities.push(new PersonRecord(payload))
        )
        .set('loading', false)

    case GET_PEOPLE_SUCCESS:
      return state
        .set('entities', new List(payload.people))
        .set('loading', false)

    case GET_PEOPLE_START:
      return state.set('loading', true)

    case GET_PEOPLE_FAIL:
      return state.set('error', error).set('loading', false)

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
  (state) => state
)

/**
 * Action Creators
 * */

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: { person }
  }
}

/**
 * Sagas
 **/

export function* addPersonSaga(action) {
  yield put({
    type: ADD_PERSON_START
  })
  try {
    const id = yield call(generateId)
    const person = {
      id,
      ...action.payload.person
    }

    yield call(api.addEntityToCollection, 'people', person)

    yield put({
      type: ADD_PERSON_SUCCESS,
      payload: person
    })

    yield put(reset('person'))
  } catch (error) {
    yield put({
      type: ADD_PERSON_FAIL,
      error
    })
  }
}

export function getPeople(person) {
  return {
    type: GET_PEOPLE_REQUEST,
    payload: { person }
  }
}

export function* getPeopleSaga() {
  yield put({
    type: GET_PEOPLE_START
  })
  try {
    const people = yield call(api.getDataFromCollection, 'people')
    yield put({
      type: GET_PEOPLE_SUCCESS,
      payload: { people }
    })
  } catch (error) {
    yield put({
      type: GET_PEOPLE_FAIL,
      error
    })
  }
}

export function* saga() {
  yield all([
    takeEvery(GET_PEOPLE_REQUEST, getPeopleSaga),
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
  ])
}
