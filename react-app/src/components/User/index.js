import React from 'react'
import { Link } from 'react-router-dom';

import './User.css'


const User = (props) => {
    return (
        <div className='user'>
            <h1>User</h1>
            <Link to='/my/lists/new'>Add List</Link>
            {props.children}
        </div>
    )
}


export default User
