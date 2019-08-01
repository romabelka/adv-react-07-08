import React from 'react'
import PersonList from "../components/people-list";

function PersonPage({ person }) {
    return (
        <div>
          <h1>{person.name}</h1>
            <PersonList />
        </div>
    )
}

const personQuery = `
    query Person($id: ID) {
        person(id: $id) {
            id
            name
        }
    }
`

PersonPage.getInitialProps = async ({ query }) => {
    const res = await fetch('http://localhost:5000' , {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            query: personQuery,
            variables: { id: query.id }
        })
    })

    const { data: { person }} = await res.json()


    return { person }
}

export default PersonPage
