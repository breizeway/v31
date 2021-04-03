import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './List.css'
import * as listActions from '../../store/lists'
import { formatListDate } from '../../services/dates'
import Picks from '../Picks'


const List = () => {
    const dispatch = useDispatch()
    const { listId } = useParams()

    const list = useSelector(state => state.lists.all[listId])

    useEffect(() => {
        (async () => {
            await dispatch(listActions.runAddLists([listId], true))
        })()
    }, [dispatch, listId])

    if (!list) return null
    //-------- manipulate list below -----------\\

    const dates = formatListDate(list.start_date, list.end_date)

    return (
        <div className='list'>
            <div className='list__title'>{list.title}</div>
            <div className='list__date'>{dates}</div>
            <div className='list__description'>{list.description}</div>
            {list.picks.length ? (
                <Picks />
            ) : (
                <div>Add picks...</div>
            )}
        </div>
    )
}


export default List
