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
        <div className='container'>
            <h2>Login</h2>
            <form onSubmit={onLogin}>
                <div>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>
                <div>
                    <input
                        className='input-top'
                        name='username'
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={updateUsername}
                    />
                </div>
                <div>
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
                    <input type='submit' className='button' value='Login' />
                </div>
            </form>
            <div className='footer'>
                <Link className='lnk' to='/sign-up'>New User? Sign up</Link>
            </div>
        </div>
    )
}


export default LoginForm
