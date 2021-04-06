import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Modal.css'
import * as modalActions from '../../store/modal'

const Modal = ({ content }) => {
    const dispatch = useDispatch()
    const modalVisible = useSelector(state => state.modal.visible)

    useEffect(() => {
        dispatch(modalActions.toggleVisibility())
    }, [dispatch])

    if (!modalVisible) return null

    const hide = () => dispatch(modalActions.toggleVisibility())

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
                    <div
                        className='modal__close icon'
                        onClick={hide}
                    >
                        <i className='fas fa-times' />
                    </div>
                    {content}
                </div>
            </div>

        </div>
    )
}


export default Modal
