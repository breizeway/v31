import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './UserCard.css'
import * as userCardActions from '../../store/components/userCard'
import * as usersDataActions from '../../store/users'
import Loading from '../Loading'
import ProfileImg from '../images/ProfileImg'
import TextButton from '../buttons/TextButton'


const UserCard = ({ username }) => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.users.byUsername[username])

    useEffect(() => {
        if (!user) dispatch(usersDataActions.runAddUserFromUsername(username))
    }, [dispatch, username])

    const rendered = {
        val: useSelector(state => state.components.UserCard.rendered[username]),
        set: () => dispatch(userCardActions.setRendered(username)),
    }

    if (!user) return <Loading />

    if (!rendered.val) {
        rendered.set()
    }

    return (
        <div className='user-card'>
            <div className='user-card__bio'>
                <ProfileImg
                    url={user.profile_img}
                    length={80}
                    userId={user.id}
                    username={user.username}
                />
                <div className='user-card__name-follow'>
                    <div className='header-1'>{user.username}</div>
                    <TextButton
                        content='Follow'

                    />
                </div>
            </div>
        </div>
    )
}


export default UserCard
