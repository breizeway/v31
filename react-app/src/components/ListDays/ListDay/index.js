import React from 'react'
import { useSelector } from 'react-redux'

import './ListDay.css'
import { makeDay } from '../../../services/dates'

const ListDay = ({ day, listId }) => {
    const picks = useSelector(state => {
        const filtered =  Object.values(state.picks.all).filter(pick => {
            const inList = pick.list_id === listId
            const onDate = makeDay(pick.date).sort === day.sort
            return inList && onDate
        })
        return filtered
    })
    const pick = picks && picks[0]

    return (
        <div className='list-day'>
            {day.day}
            {pick && (
                <div>
                    <div>
                        {pick.title}
                    </div>
                </div>
            )}
        </div>
    )
}


export default ListDay
