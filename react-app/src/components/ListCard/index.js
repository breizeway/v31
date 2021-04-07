import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './ListCard.css'
import ListCardHost from './ListCardHost'
import PosterGoRound from '../images/PosterGoRound'
import { formatListDate } from '../../services/dates'


const ListCard = ({ dataKey }) => {
    const history = useHistory()

    const list = useSelector(state => state.lists.all[dataKey])
    if (!list) return null

    const dates = formatListDate(list.start_date_sort, list.end_date_sort)

    const openList = () => {
        history.push(`/lists/${list.id}`)
    }

    return (
        <div
            className='list-card card'
            onClick={openList}
        >
            <div className='list-card__title'>
                {list.title}
            </div>
            <div className='list-card__date'>{dates}</div>
            <ListCardHost host={list.host} />
            <div className='list-card__editorial card-fade'>
                {list.editorial}
            </div>
            {list.picks.length ? (
                <PosterGoRound
                    height={'200px'}
                    sources={list.picks.map(pick => {
                        return pick.original_poster_url
                    })}
                />
            ) : (
                null
            )}

        </div>
    )
}


export default ListCard
