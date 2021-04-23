import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import './User.css'
import * as userActions from '../../store/components/user'
import * as usersDataActions from '../../store/users'
import Loading from '../Loading'
import UserCard from '../UserCard'
import ViewBar from '../ViewBar'


const User = () => {
    const dispatch = useDispatch()
    const username = useParams().username.toLowerCase()

    useEffect(() => {
        dispatch(usersDataActions.runAddUserFromUsername(username))
    }, [dispatch, username])

    const user = useSelector(state => state.users.byUsername[username])

    const rendered = {
        val: useSelector(state => state.components.User.rendered[username]),
        set: () => dispatch(userActions.setRendered(username)),
    }

    if (!user) return <Loading />

    if (!rendered.val) {
        rendered.set()
    }

    const viewBarViews = [
        {header: 'Lists', content: <div>Lists Content</div>},
        {header: 'Followers', content: <div>Followers Content</div>},
        {header: 'Following', content: <div>Following Content</div>},
    ]

    return (
        <div className='user space-col-big'>
            <UserCard username={username} />
            <ViewBar views={viewBarViews} viewBarName={`User/${username}`}/>
        </div>
    )
}


export default User
