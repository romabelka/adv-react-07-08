const events = require('../mocks/events')
const people = require('../mocks/people')

module.exports = {
    Query: {
        allEvents: () => new Promise(resolve => setTimeout(
            () => resolve(Object.values(events))
        , 500)),
        event: (_, { id }) => events[id],
        person: (_, { id }) => people.find(person => person.id === id)
    },
    Mutation: {
        addPersonToEvent: (_, { eventId, name }) => {
            const person = {
                firstName: name,
                id: Math.floor(Math.random() * 1000)
            }

            people.push(person)
            const event = events[eventId]

            event.peopleIds = (event.peopleIds || []).concat(person.id)

            return person
        }
    },
    Event: {
        people: (event) => event.peopleIds.map(id => people.find(person => person.id === id))
    },
    Person: {
        name: person => person.firstName
    }
}
