import React, { useState } from 'react'

import './Calendar.css'
import * as dateActions from '../../services/dates'
import CalDay from './CalDay'

const Calendars = ({ listStartSort, listId }) => {
    const viewOptions = {
        month: {id: 1, label: 'Month', length: 42},
        week: {id: 2, label: 'Week', length: 7},
        day: {id: 3, label: 'Day', length: 1},
    }
    const [view, setView] = useState(viewOptions.month)

    const [firstDay, setFirstDay] = useState(listStartSort)
    const days = dateActions.makeDays(firstDay, view.length, view.id)
    const headers = view.id === 1 || view.id === 2 ?
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] :
        []
    const calendarLabel = dateActions.getCalendarLabel(days[0].obj, days[days.length - 1].obj, view.id)

    return (
        <div className='calendar flex-column-sml'>
            <div className='calendar__controls'>
                <div className='calendar__view-page'>
                    <div
                        className='icon-big'
                        onClick={() => setFirstDay(dateActions.changeDate(firstDay, view.length, false))}
                    >
                        <i className='fas fa-chevron-left' />
                    </div>
                    <div className='calendar__view-label button-big'>
                        {calendarLabel}
                    </div>
                    <div
                        className='icon-big'
                        onClick={() => setFirstDay(dateActions.changeDate(firstDay, view.length, true))}
                    >
                        <i className='fas fa-chevron-right' />
                    </div>
                </div>
                <div className='calendar__view-length'>
                    <div className='button-big'>
                        <select
                            value={JSON.stringify(view)}
                            onChange={e => setView(JSON.parse(e.target.value))}
                        >
                            {Object.keys(viewOptions).map(key => (
                                <option key={key} value={JSON.stringify(viewOptions[key])}>{viewOptions[key].label}</option>
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
