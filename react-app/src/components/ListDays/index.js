import React, { useState, useEffect } from 'react'

import './ListDays.css'
import { makeDays} from '../../services/dates'
import ListDay from './ListDay'

const ListDays = ({ start, listId }) => {
    const [firstDate, setFirstDate] = useState(start)
    const [numDays, setNumDays] = useState(7)
    const [days, setDays] = useState(makeDays(firstDate, numDays))

    const lengthOptions = {7: 'Week', 42: 'Month'}

    useEffect(() => {
        setDays(makeDays(firstDate, numDays))
    }, [numDays])

    return (
        <div className='list-days flex-column-sml'>
            <div className='list-days__controls'>
                <div className='list-days__view-length'>
                    <div className='form-field'>
                        <select
                            value={numDays}
                            onChange={e => setNumDays(e.target.value)}
                        >
                            {Object.keys(lengthOptions).map(key => (
                                <option key={key} value={key}>{lengthOptions[key]}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='list-days__view-page'>
                    <div className='icon-big'>
                        <i className='fas fa-chevron-left' />
                    </div>
                    <div className='icon-big'>
                        <i className='fas fa-chevron-right' />
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
