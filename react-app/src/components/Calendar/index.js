import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Calendar.css'
import * as dateActions from '../../services/dates'
import * as calendarActions from '../../store/components/calendar'
import CalDay from './CalDay'
import CalControls from './CalControls'

const Calendars = ({ listStartSort, listId }) => {
    const dispatch = useDispatch()

    const viewOptions = {
        val: useSelector(state => state.components.Calendar.viewOptions),
        set: () => dispatch(calendarActions.setViewOptions())
    }

    const viewDefault = useSelector(state => state.components.Calendar.view.default)
    const view = {
        val: useSelector(state => state.components.Calendar.view[listId]) || viewDefault,
        set: view => {
            dispatch(calendarActions.setView(listId, view))
            dispatch(calendarActions.setDays(listId))
        },
    }

    const viewStartDefault = listStartSort
    const viewStart = {
        val: useSelector(state => state.components.Calendar.viewStart[listId]) || viewStartDefault,
        set: date => {
            dispatch(calendarActions.setViewStart(listId, date))
            dispatch(calendarActions.setDays(listId))
        }
    }

    const daysDefault = dateActions.makeDays(listStartSort, viewOptions.val[view.val].days, viewOptions.val[view.val].id)
    const days = useSelector(state => state.components.Calendar.days[listId]) || daysDefault

    // set up Redux state with default values on the first render
    const rendered = useSelector(state => state.components.Calendar.rendered).has(listId)
    useEffect(() => {
        if (!rendered) {
            dispatch(calendarActions.setView(listId, viewDefault))
            dispatch(calendarActions.setViewStart(listId, viewStartDefault))
            dispatch(calendarActions.setDays(listId))
        }
    }, [])
    const test = useSelector(state => state.components.Calendar.days[listId])
    if (!rendered) return null


    const headers =
        viewOptions.val[view.val].id === 1 || viewOptions.val[view.val].id === 2 ?
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] :
        []

    return (
        <div className='calendar flex-column-sml'>
            <CalControls listStartSort={listStartSort} listId={listId} />
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
