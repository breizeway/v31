import React from 'react';
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';

import * as sessionActions from '../../store/session'
import * as locationActions from '../../store/location'


const LogoutButton = () => {
    const dispatch = useDispatch();


    const onLogout = async (e) => {
        await dispatch(sessionActions.logout())
        const redirect = dispatch(locationActions.resetRedirect())
        return <Redirect to={redirect} />;
    };

    return <button className='logout-button' onClick={onLogout}>Logout</button>;
};


export default LogoutButton;
