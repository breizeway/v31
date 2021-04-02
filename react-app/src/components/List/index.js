import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './List.css'
import * as listActions from '../../store/lists'


const List = () => {
    const dispatch = useDispatch()
    const { listId } = useParams()

    const list = useSelector(state => state.lists.all[listId])

    useEffect(() => {
        (async () => {
            await dispatch(listActions.runAddLists([listId], true)) // change false back to true
        })()
    }, [dispatch, listId])

    if (!list) return null

    return (
        <div className='list'>
            List
        </div>
    )
}


export default List
