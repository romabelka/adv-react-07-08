import React from 'react'
import PeopleList from '../../people/people-list'
import EventsTable from '../../events/events-table'
import Trash from '../../trash'
import CustomDragLayer from '../../custom-drag-layer'

function AllPage(props) {
  return (
    <div>
      <Trash />
      <PeopleList />
      <EventsTable />
      <CustomDragLayer />
    </div>
  )
}

AllPage.propTypes = {}

export default AllPage
