import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import auth from '../ducks/auth'
import admin from '../ducks/admin'
import history from '../history'

export default combineReducers({
  router: connectRouter(history),
  admin,
  form,
  auth
})
