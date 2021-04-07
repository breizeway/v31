import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Modal.css'
import * as modalActions from '../../store/modal'
import * as pickActions from '../../store/picks'
import * as mediaActions from '../../store/media'

const Modal = ({ content }) => {
    const dispatch = useDispatch()
    const modalVisible = useSelector(state => state.modal.visible)

    useEffect(() => {
        dispatch(modalActions.toggleVisibility())
    }, [dispatch])

    if (!modalVisible) return null

    const closeModal = () => {
        dispatch(modalActions.toggleVisibility())
        dispatch(pickActions.stagePick(null));
        dispatch(mediaActions.clearSearchResults());

    }

    return (
        <div className='modal'>
            <div
                className='modal__background'
                onClick={closeModal}
            >
                <div
                    className='modal__card card'
                    onClick={e => e.stopPropagation()}
                >
                    <div
                        className='modal__close icon-big'
                        onClick={closeModal}
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
