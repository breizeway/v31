import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './UserCard.css'
import ProfileImg from '../images/ProfileImg'
import UserFollow from '../UserFollow'


const UserCard = ({ user }) => {
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)

    return (
        <div className='user-card'>
            <div className='user-card__bio' onClick={() => history.push(`/u/${user.username}`)}>
                <ProfileImg
                    url={user.profile_img}
                    length={50}
                    userId={user.id}
                    username={user.username}
                />
                <div>{user.username}</div>
            </div>
            <UserFollow sessionUser={sessionUser} followUser={user} />
        </div>
    )
}


export default UserCard
