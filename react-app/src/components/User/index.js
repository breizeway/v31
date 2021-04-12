import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';

import './User.css'


const User = (props) => {
    const history = useHistory()

    const path = useLocation().pathname

    return (
        <div className='user'>
            <div className='user-add'>
                {path === '/my' && <div className='button-big' onClick={() => history.push('/my/lists/new')}>New List</div>}
            </div>
            {props.children}
        </div>
    )
}


export default User
