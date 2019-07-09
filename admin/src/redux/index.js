import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import firebase from 'firebase/app'
import reducer from './reducer'
import history from '../history'
import { SIGN_IN_SUCCESS, SIGN_OUT_SUCCESS } from '../ducks/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(
  applyMiddleware(thunk, routerMiddleware(history), logger)
)

const store = createStore(reducer, enhancer)

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch({ type: SIGN_IN_SUCCESS, payload: { user } })
  } else {
    store.dispatch({ type: SIGN_OUT_SUCCESS })
  }
})

//dev only
window.store = store

export default store
