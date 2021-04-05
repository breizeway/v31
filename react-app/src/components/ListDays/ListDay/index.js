import React from 'react'
import { useSelector } from 'react-redux'

import './ListDay.css'
import { makeDay } from '../../../services/dates'

const ListDay = ({ day, listId }) => {
    const picks = useSelector(state => {
        return Object.values(state.picks.all).filter(pick => {
            const inList = pick.list_id === listId
            const onDate = makeDay(pick.date).sort === day.sort
            return inList && onDate
        })
    })

    const hasPick = picks.length !== 0

    const pick = hasPick && picks[0]

    const clickDay = () => {
        if (hasPick) return
        console.log('   :::HASPICK:::   ', hasPick);
    }

    return (
        <div
            className='list-day'
            onClick={clickDay}
        >
            <div className='list-day__date'>
                {day.date}
            </div>
            {pick ? (
                <div>
                    <div>
                        {pick.title}
                    </div>
                </div>
            ) : (
                <div className='list-day_add'>
                    +
                </div>
            )}
        </div>
    )
}


export default ListDay
