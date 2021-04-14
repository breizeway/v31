import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './NavMenu.css'
import DropDown from '../../DropDown'
import { setActive } from '../../../store/components/DropDown'

const NavMenu = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const dropDownId = 'NavMenu'
    const dropDown = {
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDownId))
    }
    const dropDownOptions = [
        {content: <strong>Home</strong>, click: () => history.push('/')},
        {content: 'Me', click:  () => history.push('/my')},
    ]

    return (
        <div className='nav-menu navbar__item'>
            <div
                className='nav-menu__trigger dropdown__trigger'
                // onClick={dropDown.set}
                onClick={() => history.push('/')}
            >
                {/* <div className='logo-div'>
                    <img
                        className='logo'
                        src='/../logo.png'
                    >
                    </img>
                </div> */}
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
                {/* <div className='nav-menu__arrow'>
                    {dropDown.val === dropDownId ? (
                        <i className='fas fa-angle-up'/>
                    ) : (
                        <i className='fas fa-angle-down'/>
                    )}
                </div> */}
            </div>
            {dropDown.val === dropDownId && (
                <DropDown options={dropDownOptions} justify='left'/>
            )}
        </div>
    )
}


export default NavMenu
