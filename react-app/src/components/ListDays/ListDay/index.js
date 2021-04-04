import React from 'react'
import { useSelector } from 'react-redux'

import './ListDay.css'

const ListDay = ({ date, listId }) => {
    // const list = useSelector(state => state.lists.all[listId])
    console.log('   :::DATE:::   ', date);
    return (
        <div className='list-day'>
            {date.day}
        </div>
    )
}


export default ListDay
