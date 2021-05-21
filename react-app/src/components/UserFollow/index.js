import React from 'react'
import { useDispatch } from 'react-redux'

import './UserFollow.css'
import TextButton from '../buttons/TextButton'
import * as usersActions from '../../store/users'


const UserFollow = ({ sessionUser, followUser }) => {
    const dispatch = useDispatch()
    const sessionFollows = sessionUser.following.map(user => user.id).includes(followUser.id)

    const toggleFollow = () => {
        dispatch(usersActions.runFollow(sessionUser.id, followUser.id, sessionFollows, sessionUser.username))
    }

    const buttonText = (() => {
        return sessionFollows ? 'Unfollow' : 'Follow'
    })()

    return (
        <>
            {sessionUser && sessionUser.id !== followUser.id && (
                <TextButton
                    content={buttonText}
                    action={toggleFollow}
                />
            )}
        </>
    )
}


export default UserFollow
