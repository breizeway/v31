import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Calendar.css'
import * as dateActions from '../../services/dates'
import CalDay from './CalDay'

const Calendars = ({ listStartSort, listId }) => {
    const viewOptions = {
        month: {id: 1, label: 'Month', length: 42},
        week: {id: 2, label: 'Week', length: 7},
        day: {id: 3, label: 'Day', length: 1},
    }
    const [view, setView] = useState('month')

    const [firstDay, setFirstDay] = useState(listStartSort)
    const days = dateActions.makeDays(firstDay, viewOptions[view].length, viewOptions[view].id)
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
                        onClick={() => setFirstDay(dateActions.changeDate(firstDay, viewOptions[view].length, false))}
                    >
                        <i className='fas fa-chevron-left' />
                    </div>
                    <div className='calendar__view-label button-big'>
                        {calendarLabel}
                    </div>
                    <div
                        className='icon-big'
                        onClick={() => setFirstDay(dateActions.changeDate(firstDay, viewOptions[view].length, true))}
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
