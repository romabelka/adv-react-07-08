import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import history from '../history'
import auth from '../ducks/auth'
import people from '../ducks/people'
import events from '../ducks/events'

export default combineReducers({
  router: connectRouter(history),
  form,
  auth,
  people,
  events
})
