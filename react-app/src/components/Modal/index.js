import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Modal.css'
import * as modalActions from '../../store/modal'

const Modal = ({ content }) => {
    const dispatch = useDispatch()
    const modalVisible = useSelector(state => state.modal.visible)

    const testContent = content || <div>test</div>

    useEffect(() => {
        dispatch(modalActions.toggleVisibility())
    }, [])

    if (!modalVisible) return null

    const hide = () => {
        dispatch(modalActions.toggleVisibility())
        console.log('   :::MODALVISIBLE:::   ', modalVisible)
    }

    return (
        <div className='modal'>
            <div
                className='modal__background'
                onClick={hide}
            >
                <div
                    className='modal__card card'
                    onClick={e => e.stopPropagation()}
                >
                    {testContent}
                </div>
            </div>

        </div>
    )
}


export default Modal
