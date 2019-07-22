const events = require('../mocks/events')
const people = require('../mocks/people')

module.exports = {
    Query: {
        allEvents: () => new Promise(resolve => resolve(Object.values(events)))
    },
    Event: {
        people: (event) => event.peopleIds.map(id => people.find(person => person.id === id))
    },
    Person: {
        name: person => person.firstName
    }
}
