import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './NavProfile.css'
import DropDown from '../../DropDown'
import ProfileImg from '../../images/ProfileImg'
import { setActive } from '../../../store/components/DropDown'
import * as sessionActions from '../../../store/session'
import * as locationActions from '../../../store/location'


const NavProfile = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session?.user)

    const onLogout = async (e) => {
        await dispatch(sessionActions.logout())
        const redirect = dispatch(locationActions.resetRedirect())
        return <Redirect to={redirect} />;
    };

    const dropDownId = NavProfile.name
    const dropDown = {
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDownId))
    }
    const dropDownOptions = {
        loggedIn: [
            {content: 'Account Settings', click: () => history.push('/account')},
            {content: 'Log Out', click: onLogout},
        ],
        loggedOut: [
            {content: 'Log In', click:  () => history.push('/login')},
            {content: 'Sign Up', click: () => history.push('/signup')},
        ]
    }

    return (
        <div className='nav-profile'>
            <div
                className='dropdown__trigger'
                onClick={dropDown.set}
            >
                {user ? (
                    <ProfileImg
                        url={user?.profile_img}
                        length={50}
                        userId={user?.id}
                        username={user?.username}
                    />
                ) : (
                    <ProfileImg
                        url={null}
                        length={50}
                        userId={20}
                        username='pl'
                    />
                )}
            </div>
            {dropDown.val === dropDownId && (
                <DropDown options={user ? dropDownOptions.loggedIn : dropDownOptions.loggedOut} justify='right'/>
            )}
        </div>
    )
}


export default NavProfile
