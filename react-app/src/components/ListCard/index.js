import React from 'react'
import { useSelector } from 'react-redux'

import './ListCard.css'
import ListCardUser from './ListCardUser'
import PosterGoRound from '../images/PosterGoRound'
import { formatListDate } from '../../services/dates'


const ListCard = ({ dataKey }) => {
    const listsType = useSelector(state => state.lists.listsType)

    const list = useSelector(state => state.lists[listsType][dataKey])
    const listMedia = useSelector(state => state.lists[`${listsType}Media`][dataKey])

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
