import React, { useState, useEffect } from 'react'

import './ListDays.css'
import * as dateActions from '../../services/dates'
import ListDay from './ListDay'

const ListDays = ({ listStartSort, listId }) => {
    const lengthOptions = {
        month: {label: 'Month', length: 42},
        week: {label: 'Week', length: 7},
        day: {label: 'Day', length: 1},
    }

    const [firstDay, setFirstDay] = useState(listStartSort)
    const [numDays, setNumDays] = useState(lengthOptions.month.length)
    console.log('   :::NUMD--AYS:::   ', numDays);

    const days = dateActions.makeDays(firstDay, numDays)
    // const lengthOptions = {7: 'Week', 42: 'Month'}

    return (
        <div className='list-days flex-column-sml'>
            <div className='list-days__controls'>
                <div className='list-days__view-page'>
                    <div
                        className='icon-big'
                        onClick={() => setFirstDay(dateActions.changeDate(firstDay, numDays, false))}
                    >
                        <i className='fas fa-chevron-left' />
                    </div>
                    <div className='button-big'>
                        monthname
                    </div>
                    <div
                        className='icon-big'
                        onClick={() => setFirstDay(dateActions.changeDate(firstDay, numDays, true))}
                    >
                        <i className='fas fa-chevron-right' />
                    </div>
                </div>
                <div className='list-days__view-length'>
                    <div className='form-field'>
                        <select
                            value={numDays}
                            onChange={e => setNumDays(parseInt(e.target.value))}
                        >
                            {Object.keys(lengthOptions).map(key => (
                                <option key={key} value={lengthOptions[key].length}>{lengthOptions[key].label}</option>
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
