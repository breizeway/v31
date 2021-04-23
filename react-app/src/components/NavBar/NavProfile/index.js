import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './NavProfile.css'
import DropDown from '../../DropDown'
import ProfileImg from '../../images/ProfileImg'
import Modal from '../../Modal'
import LoginForm from '../../auth/LoginForm'
import * as dropDownActions from '../../../store/components/dropDown'
import * as sessionActions from '../../../store/session'
import * as locationActions from '../../../store/location'
import * as modalActions from '../../../store/components/modal'



const NavProfile = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const user = useSelector(state => state.session?.user)

    const onLogout = async (e) => {
        await dispatch(sessionActions.logout())
        const redirect = dispatch(locationActions.resetRedirect())
        return <Redirect to={redirect} />;
    };

    const loginModal = {
        thisVal: 'NavProfile/login',
        val: useSelector(state => state.components.Modal.active),
        setLogin: () => dispatch(modalActions.setActive(loginModal.thisVal)),
        clear: () => dispatch(modalActions.removeActive(loginModal.thisVal))
    }

    const dropDown = {
        thisVal: 'NavProfile',
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(dropDownActions.setActive(dropDown.thisVal)),
        options: {
            loggedIn: [
                {content: 'My Profile', click: () => history.push(`/u/${user.username}`)},
                {content: 'Logout', click: onLogout},
            ],
            loggedOut: [
                {content: 'Log In', click: () => loginModal.setLogin()},
                {content: 'Sign Up', click: () => history.push('/signup')},
            ]
        }
    }

    return (
        <div className='nav-profile navbar__item'>
            <div
                className='dropdown__trigger'
                onClick={dropDown.set}
            >
                {user ? (
                    <ProfileImg
                        url={user?.profile_img}
                        length={40}
                        userId={user?.id}
                        username={user?.username}
                    />
                ) : (
                    <ProfileImg
                        url={null}
                        length={40}
                        userId={29}
                        username='pl'
                    />
                )}
            </div>
            {dropDown.val === dropDown.thisVal && (
                <DropDown options={user ? dropDown.options.loggedIn : dropDown.options.loggedOut} justify='right'/>
            )}
            {loginModal.val === loginModal.thisVal && (
                <Modal
                    width={'400px'}
                    content={<LoginForm goTo={() => loginModal.clear()} />}
                />
            )}
        </div>
    )
}


export default NavProfile
