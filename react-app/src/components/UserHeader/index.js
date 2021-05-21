import React from 'react'
import { useSelector } from 'react-redux'

import './UserHeader.css'
import ProfileImg from '../images/ProfileImg'
import UserFollow from '../UserFollow'


const UserHeader = ({ user }) => {

    const sessionUser = useSelector(state => state.session.user)

    return (
        <div className='user-header'>
            <div className='user-header__bio'>
                <ProfileImg
                    url={user.profile_img}
                    length={80}
                    userId={user.id}
                    username={user.username}
                />
                <div className='user-header__name-follow'>
                    <div className='header-1'>{user.username}</div>
                    <UserFollow sessionUser={sessionUser} followUser={user} />
                </div>
            </div>
        </div>
    )
}


export default UserHeader
