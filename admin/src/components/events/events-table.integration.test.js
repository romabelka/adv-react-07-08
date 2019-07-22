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
    const table = mount(
      <Provider store={store}>
        <EventsTable />
      </Provider>
    )

    setTimeout(() => {
      table.update()
      expect(table.find('[data-id="event-row"]').length).toEqual(
        mockEvents.length
      )
      done()
    }, 0)
  })
})
