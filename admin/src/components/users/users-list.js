import React from 'react'

function UsersList({ users }) {
  return (
    <div>
      {users.length === 0 && 'no users yet'}

      <ul>
        {users.length > 0 &&
          users.map(({ email }, i) => <li key={i}>{email}</li>)}
      </ul>
    </div>
  )
}

export default UsersList
