import React from 'react'
import { useHistory } from 'react-router-dom'

import './NavMenu.css'

const NavMenu = () => {
    const history = useHistory()
    return (
        <div className='nav-menu navbar__item'>
            <div
                className='nav-menu__trigger dropdown__trigger'
                onClick={() => history.push('/')}
            >
                <div className='logo-div-b'
                    style={{
                        // backgroundImage: 'url(./assets/logo.png)',
                        width: '32px',
                        height: '100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }}
                >
                </div>
            </div>
        </div>
    )
}


export default NavMenu
