import { appName } from '../config'
import { Record, List } from 'immutable'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { put, takeEvery, call } from 'redux-saga/effects'
import { generateId } from '../services/utils'
import { savePersonToFB, getPersonsFromFB } from '../mocks/index'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`

export const GET_PEOPLE = `${prefix}/GET_PEOPLE`
export const GET_PEOPLE_REQUEST = `${prefix}/GET_PEOPLE_REQUEST`
export const GET_PEOPLE_ERROR = `${prefix}/GET_PEOPLE_ERROR`

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
    case ADD_PERSON:
      return state.update('entities', (entities) => {
        entities.push(new PersonRecord(payload))
      })
    case GET_PEOPLE:
      return state.update('entities', (entities) =>
        payload.map((person) => entities.push(new PersonRecord(person)))
      )

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

export function addPerson(person) {
  return {
    type: ADD_PERSON_REQUEST,
    payload: { person }
  }
}

export function getPeople() {
  return {
    type: GET_PEOPLE_REQUEST
  }
}

/**
 * Sagas
 **/

export function* addPersonSaga(action) {
  const id = yield call(generateId)

  try {
    yield call(savePersonToFB, action.payload.person)

    yield put({
      type: ADD_PERSON,
      payload: {
        id,
        ...action.payload.person
      }
    })
  } catch (error) {
    yield put({
      type: ADD_PERSON_ERROR,
      error
    })
  }

  yield put(reset('person'))
}

export function* getPeopleSaga() {
  try {
    const people = yield call(getPersonsFromFB)

    const peopleWithID = people.map((person) => {
      const id = generateId()
      return {
        id,
        ...person.data()
      }
    })

    yield put({
      type: GET_PEOPLE,
      payload: peopleWithID
    })
  } catch (error) {
    yield put({
      type: GET_PEOPLE_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
  yield takeEvery(GET_PEOPLE_REQUEST, getPeopleSaga)
}
