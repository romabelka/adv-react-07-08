import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'

const query = gql`{
    allPeople { id name }
}`

function PeopleList() {
    return (
        <Query query={query}>
            {({data, loading}) => {
                if (loading) return <h1>Loading...</h1>
                return data.allPeople.map(person => (
                    <div key={person.id}>
                        <Link href={`/person?id=${person.id}`} as={`/person/${person.id}`}>
                            <a>
                                {person.name}
                            </a>
                        </Link>
                    </div>
                ))
            }}
        </Query>
    )
}

PeopleList.propTypes = {
}

export default PeopleList
