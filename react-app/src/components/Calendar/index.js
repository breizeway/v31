import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Calendar.css'
import * as calendarActions from '../../store/components/calendar'
import CalDay from './CalDay'
import CalControls from './CalControls'

const Calendar = ({ listStartSort, listId }) => {
    const dispatch = useDispatch()

    const viewOptions = useSelector(state => state.components.Calendar.viewOptions)
    const view = useSelector(state => state.components.Calendar.view[listId]) || 'month'
    const days = useSelector(state => state.components.Calendar.days[listId])

    const rendered = useSelector(state => state.components.Calendar.rendered).has(listId)
    useEffect(() => {
        if (!rendered) {
            dispatch(calendarActions.setView(listId, view))
            dispatch(calendarActions.setViewStart(listId, listStartSort))
            dispatch(calendarActions.setInitialViewStart(listId, listStartSort))
            dispatch(calendarActions.setDays(listId))
        }
    }, [dispatch, listId, listStartSort, rendered, view])
    if (!rendered) return null

    const headers =
        viewOptions[view].id === 1 || viewOptions[view].id === 2 ?
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
