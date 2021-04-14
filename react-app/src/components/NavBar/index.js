import React from 'react';

import './NavBar.css'
import NavMenu from './NavMenu'
import NavProfile from './NavProfile'
import NavAdd from './NavAdd'


const NavBar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar__items'>
                <NavMenu />
                <div className='navbar__profile-items'>
                    <NavAdd />
                    <NavProfile />
                </div>
            </div>
        </nav>
    );
}


export default NavBar;
