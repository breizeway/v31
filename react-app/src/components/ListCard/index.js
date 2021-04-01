import React from 'react'

import './ListCard.css'


const ListCard = ({ list }) => {
    return (
        <div className='list-card'>
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
