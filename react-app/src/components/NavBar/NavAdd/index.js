import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './NavAdd.css'
import DropDown from '../../DropDown'
import { setActive } from '../../../store/components/dropDown'


const NavAdd = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const loggedIn = useSelector(state => state.session.loggedIn)
    const user = useSelector(state => state.session?.user)

    const dropDownId = 'NavAdd'
    const dropDown = {
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDownId))
    }
    const dropDownOptions = [
            {content: 'New List', click: () => history.push('/my/lists/new')},
    ]

    return (
        <div className='nav-add navbar__item'>
            <div
                className='nav-add__trigger dropdown__trigger'
                onClick={dropDown.set}
            >
                <div className='nav-add__plus'>
                    <i className='fas fa-plus'/>
                </div>
                <div className='nav-add__arrow'>
                    {dropDown.val === dropDownId ? (
                        <i className='fas fa-angle-up'/>
                    ) : (
                        <i className='fas fa-angle-down'/>
                    )}
                </div>
            </div>
            {dropDown.val === dropDownId && (
                <DropDown options={dropDownOptions} justify='right'/>
            )}
        </div>
    )
}


export default NavAdd
