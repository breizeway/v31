import React from 'react';

import './NavBar.css'
import NavMenu from './NavMenu'
import NavProfile from './NavProfile'


const NavBar = () => {
    return (
        <nav className='navbar'>
            <div className='navbar__items'>
                <NavMenu />
                <NavProfile />
            </div>
        </nav>
    );
}


export default NavBar;
