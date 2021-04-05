import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './ListDay.css'
import { makeDay } from '../../../services/dates'
import Modal from '../../Modal'
import * as modalActions from '../../../store/modal'

const ListDay = ({ day, listId }) => {
    const dispatch = useDispatch()

    const modalVisible = useSelector(state => state.modal.visible)
    const [thisModalVisible, setThisModalVisible] = useState(false)
    useEffect(() => {
        if (!modalVisible) {
            setThisModalVisible(false)
        }
    }, [modalVisible])

    const picks = useSelector(state => {
        return Object.values(state.picks.all).filter(pick => {
            const inList = pick.list_id === listId
            const onDate = makeDay(pick.date).sort === day.sort
            return inList && onDate
        })
    })

    const hasPick = picks.length !== 0

    const pick = hasPick && picks[0]

    const clickDay = () => {
        if (hasPick) return
        // dispatch(modalActions.toggleVisibility())
        setThisModalVisible(true)
    }


    return (
        <>
            <div
                className='list-day'
                onClick={clickDay}
            >
                <div className='list-day__date'>
                    {day.date}
                </div>
                {pick ? (
                    <div>
                        <div>
                            {pick.title}
                        </div>
                    </div>
                ) : (
                    <div className='list-day_add'>
                        +
                    </div>
                )}
            </div>
            {thisModalVisible && <Modal />}
        </>
    )
}


export default ListDay
