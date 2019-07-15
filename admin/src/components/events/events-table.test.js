import React from 'react'
import Enzyme, { shallow, render, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { EventsTable } from './events-table'
import conferences from '../../mocks/conferences'
import Loader from '../common/loader'

const events = conferences.map((conf, id) => ({ ...conf, id }))

Enzyme.configure({ adapter: new Adapter() })

describe('EventsTable', () => {
  it('should render a loader', () => {
    const component = shallow(<EventsTable loading />, {
      disableLifecycleMethods: true
    })

    expect(component.contains(<Loader />)).toBe(true)
  })

  it('should render a list of conferences', () => {
    const component = render(<EventsTable events={events} />, {
      disableLifecycleMethods: true
    })

    expect(component.find('[data-id="event-row"]').length).toEqual(
      conferences.length
    )
  })

  it('should fetch all conferences', () => {
    const fn = jest.fn()

    shallow(<EventsTable events={events} fetchAllEvents={fn} />)

    expect(fn.mock.calls.length).toBe(1)
  })

  it('should select an event on click', () => {
    const fn = jest.fn()

    const component = mount(
      <EventsTable
        events={events}
        fetchAllEvents={jest.fn()}
        selectEvent={fn}
      />
    )

    component
      .find('[data-id="event-row"]')
      .at(0)
      .simulate('click')

    expect(fn).toBeCalledWith(events[0].id)
  })
})
