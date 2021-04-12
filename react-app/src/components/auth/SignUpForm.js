import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';

import './UpForms.css'
import * as sessionActions from '../../store/session'


const SignUpForm = () => {
    const authenticated = useSelector(state => state.session.user)
    const redirect = useSelector(state => state.location.redirect)

    const dispatch = useDispatch()
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const user = await dispatch(sessionActions.signup(username, firstName, lastName, email, password))
            if (user.errors) setErrors(user.errors);
        }
    };

    if (authenticated) {
        return <Redirect to={redirect} />;
    }

    return (
        <div className='up-form'>
            <form onSubmit={onSignUp} className='card'>
                <div className='header-2'>Sign up</div>
                {errors.length > 0 &&  <div className='val-errors'>
                    {errors.map((error, i) => (
                        <div key={i}>{error}</div>
                    ))}
                </div>}
                <div className='form-field'>
                    <input
                        className='input-top'
                        type='text'
                        name='username'
                        placeholder='Username'
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                    />
                </div>
                <div className='form-field'>
                    <input
                        className='input-middle'
                        type='text'
                        name='firstName'
                        placeholder='First Name'
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                    />
                </div>
                <div className='form-field'>
                    <input
                        className='input-middle'
                        type='text'
                        name='lastName'
                        placeholder='Last Name'
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                    />
                </div>
                <div className='form-field'>
                    <input
                        className='input-middle'
                        type='text'
                        name='email'
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className='form-field'>
                    <input
                        className='input-middle'
                        type='password'
                        name='password'
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <div className='form-field'>
                    <input
                        className='input-bottom'
                        type='password'
                        name='confirm_password'
                        placeholder='Confirm Password'
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required={true}
                    ></input>
                </div>
                <div>
                    <div className='button-big'>
                        <input type='submit' className='button' value='Sign up' />
                    </div>
                </div>
            </form>
            <div className='form-footer'>
                Already have an account?&nbsp;<Link className='lnk' to='/login'>Log in</Link>
            </div>
        </div>
    );
};

export default SignUpForm;
