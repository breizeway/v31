import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './List.css'
import * as listActions from '../../store/lists'
import { formatListDate } from '../../services/dates'
import Calendar from '../Calendar'


const List = () => {
    const dispatch = useDispatch()
    const { listId } = useParams()

    const list = useSelector(state => state.lists.all[listId])

    useEffect(() => {
        (async () => {
            await dispatch(listActions.runAddLists([listId]))
        })()
    }, [dispatch, listId])

    if (!list) return null

    const dates = formatListDate(list.start_date_sort, list.end_date_sort)

    return (
        <div className='list flex-column-med'>
            <div className='list__title header-1'>{list.title}</div>
            <div className='list__date'>{dates}</div>
            <div className='list__editorial'>{list.editorial}</div>
            <Calendar
                listStartSort={list.start_date_sort}
                listId={list.id}
            />
        </div>
    )
}


export default List
