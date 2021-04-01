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
            <div className='list-card__date'>{dates}</div>
            <ListCardUser user={list.user} />
            <div className='list-card__description card-fade'>
                {list.description}
            </div>
            {Object.keys(list.picks[0]).includes('media_data') && (
                <img
                    src={`${list.picks[0].media_data.secure_image_base_url}original${list.picks[0].media_data.poster_path}`}
                    style={{
                        width: 'auto',
                        height: '200px'
                    }}
                />
            )}
        </div>
    )
}


export default ListCard
