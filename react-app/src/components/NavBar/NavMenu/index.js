import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './NavMenu.css'
import DropDown from '../../DropDown'
import { setActive } from '../../../store/components/DropDown'

const NavMenu = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const dropDownId = NavMenu.name
    const dropDown = {
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDownId))
    }
    const dropDownOptions = [
        {content: 'Home', click: () => history.push('/')},
        {content: 'Dev', click:  () => history.push('/dev')},
        {content: 'My', click:  () => history.push('/my')},
    ]

    return (
        <div className='nav-menu'>
            <div
                className='nav-menu__content dropdown__trigger'
                onClick={dropDown.set}
            >
                <div className='logo-div'>
                    <img
                        className='logo'
                        src='../logo.png'
                    >
                    </img>
                </div>
            </div>
            {dropDown.val === dropDownId && (
                <DropDown options={dropDownOptions} justify='left'/>
            )}
        </div>
    )
}


export default NavMenu
