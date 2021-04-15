import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './NavAdd.css'
import DropDown from '../../DropDown'
import Modal from '../../Modal'
import NewList from '../../forms/NewList'
import * as dropDownActions from '../../../store/components/dropDown'
import * as modalActions from '../../../store/components/modal'


const NavAdd = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    // const loggedIn = useSelector(state => state.session.loggedIn)
    // const user = useSelector(state => state.session?.user)

    const dropDownId = 'NavAdd'
    const dropDown = {
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(dropDownActions.setActive(dropDownId))
    }
    const dropDownOptions = [
            {content: 'New List', click: () => modal.set()},
    ]

    const modalName = 'NavAdd/newList'
    const modal = {
        val: useSelector(state => state.components.Modal.active),
        set: () => dispatch(modalActions.setActive(modalName))
    }

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
            {modal.val === modalName && (
                <Modal
                    width={'400px'}
                    content={<NewList />}
                />
            )}
        </div>
    )
}


export default NavAdd
