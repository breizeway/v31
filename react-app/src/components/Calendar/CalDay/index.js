import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './CalDay.css'
import Modal from '../../Modal'
import Pick from '../../Pick'
import * as modalActions from '../../../store/components/modal'

const Calendar = ({ listId, day }) => {
    const dispatch = useDispatch()

    const modalName = `Calendar/${listId}/${day.sort}`
    const modal = {
        val: useSelector(state => state.components.Modal.active),
        set: () => dispatch(modalActions.setActive(modalName))
    }

    const pick = useSelector(state => state.lists.all[listId].picks_by_date[day.sort])

    const loggedIn = useSelector(state => state.session.loggedIn)
    const user = useSelector(state => state.session.user)
    const list = useSelector(state => state.lists.all[listId])
    const owned = loggedIn && user.id === list.host.id

    const [addButtonHidden, setAddButtonHidden] = useState(true)

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
                        onClick={() => modal.set()}>
                            <span>{`${pick.title} ${pick.year && (`(${pick.year.slice(0, 4)})`)}`}</span>
                        </div>
                    </div>
                ) : (owned &&
                    <div
                        className='cal-day__add'
                        onMouseOver={() => setAddButtonHidden(false)}
                        onMouseOut={() => setAddButtonHidden(true)}
                    >
                        <div
                            className='cal-day__add-button icon-bi'
                            style={{display: addButtonHidden ? 'none' : 'flex'}}
                            onClick={() => modal.set()}
                        >
                            <i className='fas fa-plus' />&nbsp;Add Pick
                        </div>
                    </div>
                )}
            </div>
            {modal.val === modalName && (
                <Modal
                    width='700px'
                    height='700px'
                    content={
                        <Pick listId={listId} day={day} pickId={pick?.id || null}/>
                    }
                />
            )}
        </>
    )
}


export default Calendar
