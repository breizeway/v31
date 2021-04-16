import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './NavAdd.css'
import DropDown from '../../DropDown'
import Modal from '../../Modal'
import NewList from '../../forms/NewList'
import LoginForm from '../../auth/LoginForm'
import * as dropDownActions from '../../../store/components/dropDown'
import * as modalActions from '../../../store/components/modal'


const NavAdd = () => {
    const dispatch = useDispatch()

    const loggedIn = useSelector(state => state.session.loggedIn)

    const dropDown = {
        thisVal: 'NavAdd',
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(dropDownActions.setActive(dropDown.thisVal)),
        options: [
            {content: 'New List', click: loggedIn ? () => modal.setNewList() : () => modal.setLogin()},
        ]
    }

    const modal = {
        newListVal: 'NavAdd/newList',
        loginVal: 'NavAdd/login',
        val: useSelector(state => state.components.Modal.active),
        setNewList: () => dispatch(modalActions.setActive(modal.newListVal)),
        setLogin: () => dispatch(modalActions.setActive(modal.loginVal)),
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
                    {dropDown.val === dropDown.thisVal ? (
                        <i className='fas fa-angle-up'/>
                    ) : (
                        <i className='fas fa-angle-down'/>
                    )}
                </div>
            </div>
            {dropDown.val === dropDown.thisVal && (
                <DropDown options={dropDown.options} justify='right'/>
            )}
            {modal.val === modal.newListVal && (
                <Modal
                    width={'400px'}
                    content={<NewList />}
                />
            )}
            {modal.val === modal.loginVal && (
                <Modal
                    width={'400px'}
                    content={<LoginForm goTo={() => modal.setNewList()} />}
                />
            )}
        </div>
    )
}


export default NavAdd
