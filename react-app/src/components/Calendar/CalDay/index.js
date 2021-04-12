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
                            <span>{`${pick.title} ${pick.year && (`(${pick.year.slice(0, 4)})`)}`}</span>
                        </div>
                    </div>
                ) : (
                    <div
                        className='cal-day__add'
                        onMouseOver={() => setAddButtonHidden(false)}
                        onMouseOut={() => setAddButtonHidden(true)}
                    >
                        <div
                            className='cal-day__add-button icon-bi'
                            style={{display: addButtonHidden ? 'none' : 'flex'}}
                            onClick={clickDay}
                        >
                            <i className='fas fa-plus' />&nbsp;Add Pick
                        </div>
                    </div>
                )}
            </div>
            {thisModalVisible && <Modal content={<Pick listId={listId} day={day} pickId={pick?.id || null}/>} />}
        </>
    )
}


export default Calendar
