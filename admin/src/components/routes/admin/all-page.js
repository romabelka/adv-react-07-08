import React from 'react'
import PeopleList from '../../people/people-list'
import EventsTable from '../../events/events-table'
import Trash from '../../trash'

function AllPage(props) {
  return (
    <div>
      <Trash />
      <PeopleList />
      <EventsTable />
    </div>
  )
}

AllPage.propTypes = {}

export default AllPage
