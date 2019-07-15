import React from 'react'
import PeopleList from '../../people/people-list'
import EventsTable from '../../events/events-table'

function AllPage(props) {
  return (
    <div>
      <PeopleList />
      <EventsTable />
    </div>
  )
}

AllPage.propTypes = {}

export default AllPage
