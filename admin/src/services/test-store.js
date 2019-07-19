import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../redux/reducer'
import rootSaga from '../redux/saga'

export const testStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = applyMiddleware(sagaMiddleware)
  const store = createStore(reducer, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}
