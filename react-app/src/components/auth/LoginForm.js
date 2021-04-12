import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

import './UpForms.css'
import * as sessionActions from '../../store/session'


const LoginForm = () => {
    const dispatch = useDispatch()

    const authenticated = useSelector(state => state.session.user)
    const redirect = useSelector(state => state.location.redirect)

    const [errors, setErrors] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = async (e) => {
        e.preventDefault()
        const user = await dispatch(sessionActions.login(username, password))
        if (user.errors) setErrors(user.errors)
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    if (authenticated) {
        return <Redirect to={redirect} />
    }

    return (
        <div className='up-form'>
            <form onSubmit={onLogin} className='card'>
                <div className='header-2'>Login</div>
                {errors.length > 0 && <div className='val-errors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>}
                <div className='form-field'>
                    <input
                        className='input-top'
                        name='username'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={updateUsername}
                    />
                </div>
                <div className='form-field'>
                    <input
                        className='input-bottom'
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={updatePassword}
                    />
                </div>
                <div>
                    <div className='button-big'>
                        <input type='submit' className='button' value='Log In' />
                    </div>
                </div>
            </form>
            <div className='form-footer'>
                New User?&nbsp;<Link className='lnk' to='/signup'>Sign up</Link>
            </div>
        </div>
    )
}


export default LoginForm
