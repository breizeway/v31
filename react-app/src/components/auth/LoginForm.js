import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import './UpForms.css'
import * as sessionActions from '../../store/session'
import TextButton from '../buttons/TextButton'


const LoginForm = ({ goTo=null }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const authenticated = useSelector(state => state.session.user)
    const lastLocation = useSelector(state => state.location.redirect)

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

    const logInAsDemo = async () => {
        const user = await dispatch(sessionActions.login('demo', 'password'))
        if (user.errors) setErrors(user.errors)
    }

    const redirect = goTo ? goTo : () => history.push(lastLocation)
    if (authenticated) redirect()

    return (
        <>
            <form onSubmit={onLogin} className='space-col-big'>
                <div className='header-2'>Login</div>
                {errors.length > 0 && <div className='val-errors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>}
                <div className='form-field'>
                    <input
                        className='input-top modal-focus'
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
                    <input type='submit' className='button' value='Log In' />
                </div>
                <div>
                    <TextButton className='button' content='Demo User' action={logInAsDemo} />
                </div>
            </form>
            <div className='form-footer'>
                New User?&nbsp;<Link className='lnk' to='/signup'>Sign up</Link>
            </div>
        </>
    )
}


export default LoginForm
