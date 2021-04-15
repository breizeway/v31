import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './NavMenu.css'
import DropDown from '../../DropDown'
import * as dropDownState from '../../../store/components/dropDown'

const NavMenu = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const dropDownId = NavMenu.name
    const dropDownVisible = {
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(dropDownState.setActive(dropDownId))
    }

    const navMenuOptions = [
        {content: 'Home', click: () => history.push('/')},
        {content: 'Dev', click:  () => history.push('/dev')},
        {content: 'My', click:  () => history.push('/my')},
    ]

    return (
        <div className='nav-menu'>
            <div
                className='nav-menu__content'
                onClick={dropDownVisible.set}
            >
                <div className='logo-div'>
                    <img
                        className='logo'
                        src='../logo.png'
                    >
                    </img>
                </div>
            </div>
            {dropDownVisible.val === dropDownId && (
                <DropDown options={navMenuOptions} justify='left'/>
            )}
        </div>
    )
}


export default NavMenu
