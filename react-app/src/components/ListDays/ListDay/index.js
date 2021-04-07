import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import './ListDay.css'
import Modal from '../../Modal'
import Pick from '../../Pick'

const ListDay = ({ listId, day }) => {
    const modalVisible = useSelector(state => state.modal.visible)
    const [thisModalVisible, setThisModalVisible] = useState(false)
    useEffect(() => {
        if (!modalVisible) {
            setThisModalVisible(false)
        }
    }, [modalVisible])

    const pick = useSelector(state => state.lists.all[listId].picks_by_date[day.sort])

    const clickDay = () => {
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
            {thisModalVisible && <Modal content={<Pick listId={listId} day={day} />} />}
        </>
    )
}


export default ListDay
