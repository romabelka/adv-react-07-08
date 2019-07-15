import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import App from './app'
import store from './redux'
import history from './history'
import './mocks'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
