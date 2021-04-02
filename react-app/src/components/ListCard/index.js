import React from 'react'

import './ListCard.css'
import ListCardUser from './ListCardUser'
import PosterGoRound from '../images/PosterGoRound'
import { formatListDate } from '../../services/dates'


const ListCard = ({ list, listMedia }) => {
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
            {listMedia && (
                <PosterGoRound
                    height={'200px'}
                    sources={listMedia.picks.map(pick => {
                        return `${pick.media_data.secure_image_base_url}original${pick.media_data.poster_path}`
                    })}
                />
            )}
        </div>
    )
}


export default ListCard
