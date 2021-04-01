import React from 'react'

import './ListCard.css'
import ListCardUser from './ListCardUser'
import { formatListDate } from '../../services/dates'


const ListCard = ({ list }) => {
    const dates = formatListDate(list.start_date, list.end_date)

    return (
        <div className='list-card'>
            <div className='list-card__title'>
                {list.title}
            </div>
            <div className='list-card__dates'>{dates}</div>
            <ListCardUser user={list.user} />
            <div className='list-card__description'>
                {list.description}
            </div>
        </div>
    )
}


export default ListCard
