import React from 'react'

import './ListCard.css'
import ListCardUser from './ListCardUser'


const ListCard = ({ list }) => {
    return (
        <div className='list-card'>
            <ListCardUser user={list.user} />
            <div className='list-card__title'>
                {list.title}
            </div>
            <div className='list-card__description'>
                {list.description}
            </div>
        </div>
    )
}


export default ListCard
