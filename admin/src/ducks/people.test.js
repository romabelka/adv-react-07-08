import { put, call } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { addPersonSaga, ADD_PERSON_REQUEST, ADD_PERSON } from './people'
import { generateId } from '../services/utils'

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

      expect(saga.next().value).toEqual(call(generateId))

      const id = generateId()

      expect(saga.next(id).value).toEqual(
        put({
          type: ADD_PERSON,
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
