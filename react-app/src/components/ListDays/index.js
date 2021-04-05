import React, { useState } from 'react'

import './ListDays.css'
import { makeDays} from '../../services/dates'
import ListDay from './ListDay'

const ListDays = ({ start, listId }) => {
    const startDate = start || new Date()
    const [firstDate, setFirstDate] = useState(startDate)
    const [numDays, setNumDays] = useState(7)
    const [days, setDays] = useState(makeDays(firstDate, numDays))

    return (
        <div className='list-days'>

            {days.map((day, i) => (
                <ListDay
                    key={i}
                    day={day}
                    listId={listId}
                />
            ))}
        </div>
    )
}


export default ListDays
