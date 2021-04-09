import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './CalControls.css'
import * as dateActions from '../../../services/dates'
import * as calendarActions from '../../../store/components/calendar'


const CalControls = ({ listStartSort, listId }) => {
    const dispatch = useDispatch()

    const viewOptions = {
        val: useSelector(state => state.components.Calendar.viewOptions),
        set: () => dispatch(calendarActions.setViewOptions())
    }

    const view = {
        val: useSelector(state => state.components.Calendar.view[listId]),
        set: view => {
            dispatch(calendarActions.setView(listId, view))
            dispatch(calendarActions.setDays(listId))
        },
    }

    const viewStart = {
        val: useSelector(state => state.components.Calendar.viewStart[listId]),
        set: date => {
            dispatch(calendarActions.setViewStart(listId, date))
            dispatch(calendarActions.setDays(listId))
        }
    }

    const days = useSelector(state => state.components.Calendar.days[listId])

    const calendarLabel = dateActions.getCalendarLabel(days[0].obj, days[days.length - 1].obj, viewOptions.val[view.val].id)


    return (
        <div className='calendar__controls'>
            <div className='calendar__view-page'>
                <div
                    className='icon-big'
                    onClick={() => viewStart.set(dateActions.changeDate(viewStart.val, viewOptions.val[view.val].days, false))}
                >
                    <i className='fas fa-chevron-left' />
                </div>
                <div className='calendar__view-label button-big'>
                    {calendarLabel}
                </div>
                <div
                    className='icon-big'
                    onClick={() => viewStart.set(dateActions.changeDate(viewStart.val, viewOptions.val[view.val].days, true))}
                >
                    <i className='fas fa-chevron-right' />
                </div>
            </div>
            <div className='calendar__view-length'>
                <div className='button-big'>
                    <select
                        value={view.val}
                        onChange={e => view.set(e.target.value)}
                    >
                        {Object.keys(viewOptions.val).map(key => (
                            <option key={key} value={key}>{viewOptions.val[key].label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}


export default CalControls
