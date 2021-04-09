import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './CalControls.css'
import * as dateActions from '../../../services/dates'
import * as calendarActions from '../../../store/components/calendar'


const CalControls = ({ listId }) => {
    const dispatch = useDispatch()

    const viewOptions = useSelector(state => state.components.Calendar.viewOptions)
    const days = useSelector(state => state.components.Calendar.days[listId])

    const view = {
        val: useSelector(state => state.components.Calendar.view[listId]),
        set: view => dispatch(calendarActions.runSetView(listId, view)),
    }

    const viewStart = {
        val: useSelector(state => state.components.Calendar.viewStart[listId]),
        set: date => dispatch(calendarActions.runSetViewStart(listId, date)),
    }
    const initialViewStart = useSelector(state => state.components.Calendar.initialViewStart[listId])

    const calendarLabel = dateActions.getCalendarLabel(days[0].obj, days[days.length - 1].obj, viewOptions[view.val].id)
    const calendarLabelWidth = (() => {
        switch (view.val) {
            case 'week': return '175px'
            case 'day': return '100px'
            default: return '125px'
        }
    })()

    return (
        <div className='calendar-controls'>
            <div className='calendar-controls__view-page'>
                <div
                    className='icon-big'
                    onClick={() => viewStart.set(dateActions.changeDate(viewStart.val, viewOptions[view.val].days, false))}
                >
                    <i className='fas fa-chevron-left' />
                </div>
                <div
                    className='button-big'
                    onClick={() => viewStart.set(dateActions.changeDate(initialViewStart, viewOptions[view.val].days, true))}
                    style={{width: calendarLabelWidth}}
                >
                    {calendarLabel}
                </div>
                <div
                    className='icon-big'
                    onClick={() => viewStart.set(dateActions.changeDate(viewStart.val, viewOptions[view.val].days, true))}
                >
                    <i className='fas fa-chevron-right' />
                </div>
            </div>
            <div className='calendar-controls__view-length'>
                <div className='button-big'>
                    <select
                        value={view.val}
                        onChange={e => view.set(e.target.value)}
                    >
                        {Object.keys(viewOptions).map(key => (
                            <option key={key} value={key}>{viewOptions[key].label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}


export default CalControls
