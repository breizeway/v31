import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Calendar.css'
import * as dateActions from '../../services/dates'
import * as calendarActions from '../../store/components/calendar'
import CalDay from './CalDay'

const Calendars = ({ listStartSort, listId }) => {
    const dispatch = useDispatch()

    const viewOptions = {
        month: {id: 1, label: 'Month', days: 42},
        week: {id: 2, label: 'Week', days: 7},
        day: {id: 3, label: 'Day', days: 1},
    }

    const viewT = {
        get: useSelector(state => state.components.Calendar.view[listId]) || 'month',
        set: (view) => {
            dispatch(calendarActions.setView(view, listId))
        }

    }

    const view = useSelector(state => state.components.Calendar.view[listId]) || 'month'
    const setView = (view) => {
        dispatch(calendarActions.setView(view, listId))
    }
    const viewStart = useSelector(state => state.components.Calendar.viewStart[listId]) || listStartSort
    const setViewStart = (date) => {
        dispatch(calendarActions.setViewStart(date, listId))
    }

    const days = dateActions.makeDays(viewStart, viewOptions[view].days, viewOptions[view].id)
    const headers = viewOptions[view].id === 1 || viewOptions[view].id === 2 ?
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] :
        []
    const calendarLabel = dateActions.getCalendarLabel(days[0].obj, days[days.length - 1].obj, viewOptions[view].id)
    return (
        <div className='calendar flex-column-sml'>
            <div className='calendar__controls'>
                <div className='calendar__view-page'>
                    <div
                        className='icon-big'
                        onClick={() => setViewStart(dateActions.changeDate(viewStart, viewOptions[view].days, false))}
                    >
                        <i className='fas fa-chevron-left' />
                    </div>
                    <div className='calendar__view-label button-big'>
                        {calendarLabel}
                    </div>
                    <div
                        className='icon-big'
                        onClick={() => setViewStart(dateActions.changeDate(viewStart, viewOptions[view].days, true))}
                    >
                        <i className='fas fa-chevron-right' />
                    </div>
                </div>
                <div className='calendar__view-length'>
                    <div className='button-big'>
                        <select
                            value={view}
                            onChange={e => setView(e.target.value)}
                        >
                            {Object.keys(viewOptions).map(key => (
                                <option key={key} value={key}>{viewOptions[key].label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className='calendar__headers'>
                {headers.map(header => (
                    <div className='calendar__header'>{header}</div>
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


export default Calendars
