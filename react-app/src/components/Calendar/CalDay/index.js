import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import './CalDay.css'
import Modal from '../../Modal'
import Pick from '../../Pick'

const Calendar = ({ listId, day }) => {
    const modalVisible = useSelector(state => state.modal.visible)
    const [thisModalVisible, setThisModalVisible] = useState(false)
    useEffect(() => {
        if (!modalVisible) {
            setThisModalVisible(false)
        }
    }, [modalVisible])

    const pick = useSelector(state => state.lists.all[listId].picks_by_date[day.sort])

    const [addButtonHidden, setAddButtonHidden] = useState(true)

    const clickDay = () => {
        setThisModalVisible(true)
    }

    // const showAddButton = {}


    return (
        <>
            <div
                className='cal-day'
            >
                <div className='cal-day__date'>
                    {day.date}
                </div>
                {pick ? (
                    <div
                        className='cal-day__content'
                    >
                        <div className='cal-day__title'
                        onClick={clickDay}>
                            <span>{pick.title}</span>
                        </div>
                    </div>
                ) : (
                    <div
                        className='cal-day__add'
                        onMouseOver={() => setAddButtonHidden(false)}
                        onMouseOut={() => setAddButtonHidden(true)}
                    >
                        <div
                            className='cal-day__add-button icon-big'
                            style={{display: addButtonHidden ? 'none' : 'flex'}}
                            onClick={clickDay}
                        >
                            <i className='fas fa-plus' />
                        </div>
                    </div>
                )}
            </div>
            {thisModalVisible && <Modal content={<Pick listId={listId} day={day} />} />}
        </>
    )
}


export default Calendar
