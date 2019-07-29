import React, {useState} from 'react'
import {Mutation} from 'react-apollo'
import addPersonToEventMutation from '../graphql/add-person-to-event-mutation'
import eventQuery from '../graphql/event-query'

function PersonForm({ event }) {
    const [name, setName] = useState('')
    const handleChange = ev => setName(ev.target.value)

    const handleSubmit = mutate => ev => {
        mutate()
        ev.preventDefault()
    }
    return (
        <Mutation
            mutation={addPersonToEventMutation}
            update={updateCache(event.id)}
            variables={{ name, eventId: event.id }}>
            {
                mutate =>
                    <form onSubmit={handleSubmit(mutate)}>
                        <input value = {name} onChange = {handleChange}/>
                    </form>

            }
        </Mutation>
    )
}

const updateCache = id => (cache, { data: { addPersonToEvent } }) => {
    const { event } = cache.readQuery({
        query: eventQuery,
        variables: { id }
    })

    cache.writeQuery({
        query: eventQuery,
        variables: { id },
        data: {
            event: {
                ...event,
                people: [...event.people, addPersonToEvent]
            }
        }
    })

}

PersonForm.propTypes = {
}

export default PersonForm
