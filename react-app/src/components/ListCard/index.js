import React from 'react'
import { useSelector } from 'react-redux'

import './ListCard.css'
import ListCardUser from './ListCardUser'
import PosterGoRound from '../images/PosterGoRound'
import { formatListDate } from '../../services/dates'


const ListCard = ({ dataKey }) => {
    const list = useSelector(state => state.lists.all[dataKey])
    if (!list) return null

    const dates = formatListDate(list.start_date, list.end_date)

    return (
        <div className='list-card'>
            <div className='list-card__title'>
                {list.title}
            </div>
            <div className='list-card__date'>{dates}</div>
            <ListCardUser user={list.user} />
            <div className='list-card__description card-fade'>
                {list.description}
            </div>
            <PosterGoRound
                height={'200px'}
                sources={list.picks.map(pick => {
                    return pick.original_poster_url
                })}
            />
        </div>
    )
}


export default ListCard
