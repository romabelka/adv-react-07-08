import { put, call } from 'redux-saga/effects'
import { reset } from 'redux-form'
import {
  addPersonSaga,
  ADD_PERSON_REQUEST,
  ADD_PERSON,
  ADD_PERSON_START,
  ADD_PERSON_SUCCESS
} from './people'
import { generateId } from '../services/utils'
import api from '../services/api'

describe('people duck', () => {
  describe('addPersonSaga', () => {
    it('should add person', () => {
      const action = {
        type: ADD_PERSON_REQUEST,
        payload: {
          person: {
            firstName: 'Roma',
            lastName: 'Yakobchuk',
            email: 'test@email.com'
          }
        }
      }

      const saga = addPersonSaga(action)

      expect(saga.next().value).toEqual(
        put({
          type: ADD_PERSON_START,
          payload: { ...action.payload.person }
        })
      )

      expect(saga.next().value).toEqual(
        call(api.addPerson, action.payload.person)
      )

      const id = generateId()

      expect(saga.next({ id }).value).toEqual(
        put({
          type: ADD_PERSON_SUCCESS,
          payload: {
            id,
            ...action.payload.person
          }
        })
      )

      expect(saga.next().value).toEqual(put(reset('person')))

      expect(saga.next().done).toBe(true)
    })
  })
})
