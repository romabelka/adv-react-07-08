import { put, call, take, delay } from 'redux-saga/effects'
import {
  signInSaga,
  SIGN_IN_REQUEST,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_ERROR_LIMIT,
  SIGN_IN_ERROR_LIMIT_CLEAR,
  signUpSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './auth'
import api from '../services/api'

describe('auth duck', () => {
  describe('signInSaga', () => {
    it('should be sign in success', async () => {
      const action = {
        type: SIGN_IN_REQUEST,
        payload: {
          email: 'test@test.com', // this test user was added in fb
          password: '12345678'
        }
      }

      const saga = signInSaga()

      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
      expect(saga.next(action).value).toEqual(
        put({
          type: SIGN_IN_START
        })
      )
      expect(saga.next().value).toEqual(
        call(api.signIn, action.payload.email, action.payload.password)
      )
      const user = await api.signIn(
        action.payload.email,
        action.payload.password
      )

      expect(saga.next(user).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )
    })
    it('should be sign in fail', () => {
      const action = {
        type: SIGN_IN_REQUEST,
        payload: {
          email: 'test@test.com', // this test user was added in fb
          password: '12345678'
        }
      }

      const saga = signInSaga()

      expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
      expect(saga.next(action).value).toEqual(
        put({
          type: SIGN_IN_START
        })
      )
      saga.next() // for entering into 'try'
      const error = new Error('Some error')
      expect(saga.throw(error).value).toEqual(
        put({
          type: SIGN_IN_ERROR,
          error
        })
      )
    })
    it('should be sign in error limit', () => {
      const action = {
        type: SIGN_IN_REQUEST,
        payload: {
          email: 'test@test.com', // this test user was added in fb
          password: '12345678'
        }
      }

      const saga = signInSaga()

      const tryToSignIn = (act) => {
        expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST))
        expect(saga.next(act).value).toEqual(
          put({
            type: SIGN_IN_START
          })
        )
        saga.next() // for entering into 'try'
        const error = new Error('Some error')
        expect(saga.throw(error).value).toEqual(
          put({
            type: SIGN_IN_ERROR,
            error
          })
        )
      }

      tryToSignIn(action)
      tryToSignIn(action)
      tryToSignIn(action)
      tryToSignIn(action)

      expect(saga.next().value).toEqual(
        put({
          type: SIGN_IN_ERROR_LIMIT
        })
      )
      expect(saga.next().value).toEqual(delay(4000))
      expect(saga.next().value).toEqual(
        put({
          type: SIGN_IN_ERROR_LIMIT_CLEAR
        })
      )
    })
  })
  describe('signUpSaga', () => {
    it('should be sign up success', async () => {
      const action = {
        type: SIGN_UP_REQUEST,
        payload: {
          email: 'test_sign_up@test.com',
          password: '12345678'
        }
      }
      const saga = signUpSaga(action)

      expect(saga.next().value).toEqual(
        put({
          type: SIGN_UP_START
        })
      )

      const user = await api.signUp(
        action.payload.email,
        action.payload.password
      )
      expect(saga.next().value).toEqual(
        call(api.signUp, action.payload.email, action.payload.password)
      )
      expect(saga.next(user).value).toEqual(
        put({
          type: SIGN_UP_SUCCESS,
          payload: { user }
        })
      )
      await api.deleteUser(action.payload.email, action.payload.password)
    })
    it('should be sign up success', () => {
      const action = {
        type: SIGN_UP_REQUEST,
        payload: {
          email: 'test_sign_up@test.com',
          password: '12345678'
        }
      }
      const saga = signUpSaga(action)
      expect(saga.next().value).toEqual(
        put({
          type: SIGN_UP_START
        })
      )
      saga.next() // for entering into 'try'
      const error = new Error('Some error')
      expect(saga.throw(error).value).toEqual(
        put({
          type: SIGN_UP_ERROR,
          error
        })
      )
    })
  })
})
