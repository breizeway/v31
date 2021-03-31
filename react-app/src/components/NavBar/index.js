import React from 'react';
import { NavLink } from 'react-router-dom';

import LogoutButton from '../auth/LogoutButton';


const NavBar = () => {
    return (
        <nav>
            <NavLink to='/' exact={true} activeClassName='active'>
                Home
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/search' exact={true} activeClassName='active'>
                Search
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/login' exact={true} activeClassName='active'>
                Login
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
            </NavLink>
            &nbsp;|&nbsp;
            <NavLink to='/users' exact={true} activeClassName='active'>
                Users
            </NavLink>
            &nbsp;
            <LogoutButton />
        </nav>
    );
}


export default NavBar;
