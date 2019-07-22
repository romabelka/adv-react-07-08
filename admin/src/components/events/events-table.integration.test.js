import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import EventsTable from './events-table'
import store from '../../redux'
import mockEvents from '../../mocks/conferences'

jest.mock('../../services/api', () => ({
  subscribeForPeople: () => () => ({}),
  onAuthStateChanged: () => () => ({}),
  fetchAllEvents: () =>
    new Promise((resolve) => {
      resolve(mockEvents.map((ev, id) => ({ ...ev, id })))
    })
}))

describe('IT Events Table', () => {
  it('should fetch an events', (done) => {
    mount(
      <Provider store={store}>
        <EventsTable />
      </Provider>
    )

    setTimeout(() => {
      expect(store.getState().events.entities.size).toEqual(mockEvents.length)
      done()
    }, 0)
  })
})
