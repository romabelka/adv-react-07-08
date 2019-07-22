import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import history from '../history'
import { init as initAuth } from '../ducks/auth'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history))

const store = createStore(reducer, enhancer)

sagaMiddleware.run(rootSaga)

initAuth(store)

//dev only
//window.store = store

export default store
