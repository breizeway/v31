import React from 'react'

import './UserCards.css'
import UserCard from '../UserCard'


const UserCards = ({ users }) => {
    return (
        <div className='user-cards'>
            {users.map(user => (
                <UserCard user={user} key={user.id} />
            ))}
        </div>
    )
}


export default UserCards
