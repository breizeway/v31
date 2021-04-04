import React, { useState } from 'react'

import './ListDays.css'
import * as dateActions from '../../services/dates'
import ListDay from './ListDay'

const ListDays = ({ start, listId }) => {
    const startDate = start || new Date()
    const [firstDate, setFirstDate] = useState(startDate)
    const [numDays, setNumDays] = useState(7)
    const [dates, setDates] = useState(dateActions.makeDays(firstDate, numDays))

    return (
        <div className='list-days'>
            {dates.map((date, i) => (
                <ListDay
                    key={i}
                    date={date}
                    listId={listId}
                />
            ))}
        </div>
    )
}


export default ListDays
