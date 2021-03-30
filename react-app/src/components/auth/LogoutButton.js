import React from 'react';
import { useDispatch } from 'react-redux'

import * as sessionActions from '../../store/session'


const LogoutButton = () => {
    const dispatch = useDispatch();

    const onLogout = async (e) => {
        await dispatch(sessionActions.logout())
    };

    return <button className='logout-button' onClick={onLogout}>Logout</button>;
};


export default LogoutButton;
