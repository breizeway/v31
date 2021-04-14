import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Calendar.css'
import { calendarInitialize } from '../../store/components/calendar'
import CalDay from './CalDay'
import CalControls from './CalControls'

const Calendar = ({ listStartSort, listId }) => {
    const dispatch = useDispatch()

    const rendered = useSelector(state => state.components.Calendar.rendered).has(listId)
    if (!rendered) dispatch(calendarInitialize(listId, listStartSort))
    const days = useSelector(state => state.components.Calendar.calendar[listId].days)
    const view = useSelector(state => state.components.Calendar.calendar[listId].view)

    const headers =
        view === 'week' || view === 'month' ?
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] :
        []

    return (
        <div className='calendar flex-column-sml'>
            <CalControls listStartSort={listStartSort} listId={listId} />
            <div className='calendar__headers'>
                {headers.map((header, i) => (
                    <div key={i} className='calendar__header'>{header}</div>
                ))}
            </div>
            <div className='calendar__days'>
                {days.map((day, i) => (
                    <CalDay
                        key={i}
                        day={day}
                        listId={listId}
                    />
                ))}
            </div>
        </div>
    )
}


export default Calendar
