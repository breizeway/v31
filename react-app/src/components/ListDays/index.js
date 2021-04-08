import React, { useState } from 'react'

import './ListDays.css'
import * as dateActions from '../../services/dates'
import ListDay from './ListDay'

const ListDays = ({ listStartSort, listId }) => {
    const viewOptions = {
        month: {id: 1, label: 'Month', length: 42},
        week: {id: 2, label: 'Week', length: 7},
        day: {id: 3, label: 'Day', length: 1},
    }
    const [view, setView] = useState(viewOptions.month)

    const [firstDay, setFirstDay] = useState(listStartSort)
    const days = dateActions.makeDays(firstDay, view.length, view.id)
    const calendarLabel = dateActions.getCalendarLabel(days[0].obj, view.id)

    return (
        <div className='list-days flex-column-sml'>
            <div className='list-days__controls'>
                <div className='list-days__view-page'>
                    <div
                        className='icon-big'
                        onClick={() => setFirstDay(dateActions.changeDate(firstDay, view.length, false))}
                    >
                        <i className='fas fa-chevron-left' />
                    </div>
                    <div className='button-big'>
                        {calendarLabel}
                    </div>
                    <div
                        className='icon-big'
                        onClick={() => setFirstDay(dateActions.changeDate(firstDay, view.length, true))}
                    >
                        <i className='fas fa-chevron-right' />
                    </div>
                </div>
                <div className='list-days__view-length'>
                    <div className='form-field'>
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
            <div className='list-days__days'>
                {days.map((day, i) => (
                    <ListDay
                        key={i}
                        day={day}
                        listId={listId}
                    />
                ))}
            </div>
        </div>
    )
}


export default ListDays
