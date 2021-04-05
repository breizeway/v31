import React from 'react'
import { useSelector } from 'react-redux'


import './Pick.css'
import { makeDay } from '../../services/dates'
import NewPick from '../forms/NewPick'


const Pick = ({ listId, day }) => {

    const picks = useSelector(state => {
        return Object.values(state.picks.all).filter(pick => {
            const inList = pick.list_id === listId
            const onDate = makeDay(pick.date).sort === day.sort
            return inList && onDate
        })
    })

    const hasPick = picks.length !== 0

    const pick = hasPick && picks[0]

    return (
        <div className='pick'>
            {pick ? (
                JSON.stringify(pick)
            ) : (
                <NewPick />
            )}
        </div>
    )
}


export default Pick
