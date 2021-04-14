import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './CalControls.css'
import { calendarSetView, calendarResetView, calendarGoBack, calendarGoForward } from '../../../store/components/calendar'


const CalControls = ({ listId }) => {
    const dispatch = useDispatch()

    const view = useSelector(state => state.components.Calendar.calendar[listId].view)
    const viewOptions = useSelector(state => state.components.Calendar.calendar[listId].viewOptions)
    const viewLabel = useSelector(state => state.components.Calendar.calendar[listId].viewLabel)

    const calendarLabelWidth = (() => {
        switch (view) {
            case 'day': return '150px'
            case 'week': return '175px'
            case 'month': return '125px'
            default: return '175px'
        }
    })()

    return (
        <div className='calendar-controls'>
            <div className='calendar-controls__view-page'>
                <div
                    className='icon-big'
                    onClick={() => dispatch(calendarGoBack(listId))}
                >
                    <i className='fas fa-chevron-left' />
                </div>
                <div
                    className='button-big'
                    onClick={() => dispatch(calendarResetView(listId))}
                    style={{width: calendarLabelWidth}}
                >
                    {viewLabel}
                </div>
                <div
                    className='icon-big'
                    onClick={() => dispatch(calendarGoForward(listId))}
                >
                    <i className='fas fa-chevron-right' />
                </div>
            </div>
            <div className='calendar-controls__view-length'>
                <div className='button-big'>
                    <select
                        value={view}
                        onChange={e => dispatch(calendarSetView(listId, e.target.value))}
                    >
                        {viewOptions.map(view => (
                            <option key={view} value={view}>{view}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}


export default CalControls
