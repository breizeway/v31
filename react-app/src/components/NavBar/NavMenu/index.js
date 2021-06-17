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
                        width: '32px',
                        height: '100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }}
                >
                </div>
                <div className='logo-text header-3'>video<div className='logo-text-inner'>thirty</div>one</div>
            </div>
        </div>
    )
}


export default NavMenu
