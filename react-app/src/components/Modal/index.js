import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Modal.css'
import { removeActive } from '../../store/components/modal'
import * as pickActions from '../../store/picks'
import * as mediaActions from '../../store/media'

const Modal = ({ content, width='auto', height='auto'}) => {
    const dispatch = useDispatch()

    const modalVisible = {
        val: useSelector(state => state.components.Modal.active),
        rmv: () => dispatch(removeActive(modalVisible.val)),
    }

    const closeModal = () => {
        modalVisible.rmv()
        dispatch(pickActions.stagePick(null));
        dispatch(mediaActions.clearSearchResults());
    }

    useEffect(() => {
        const initialInput = document.querySelector('.modal-focus')
        initialInput && initialInput.focus()
    }, [])

    return modalVisible.val && (
        <div className='modal'>
            <div
                className='modal__background'
                onClick={closeModal}
            >
                <div
                    className='modal__card card'
                    onClick={e => e.stopPropagation()}
                    style={{width, height}}
                >
                    {content}
                    <div
                        className='modal__close icon-big'
                        onClick={closeModal}
                    >
                        <i className='fas fa-times' />
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Modal
