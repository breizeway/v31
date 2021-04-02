import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './List.css'
import * as listActions from '../../store/lists'


const List = () => {
    const dispatch = useDispatch()
    const { listId } = useParams()
    console.log('   :::LISTID:::   ', listId);
    const list = useSelector(state => state.lists.all[listId])
    console.log('   :::LIST:::   ', list);

    useEffect(() => {
        (async () => {
            await dispatch(listActions.runAddLists([listId], true)) // change false back to true
        })()
    }, [])

    return (
        <div className='list'>
            List
        </div>
    )
}


export default List
