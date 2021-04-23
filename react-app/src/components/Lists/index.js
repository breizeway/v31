import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import './Lists.css'
import * as listActions from '../../store/lists'
import ListCard from '../ListCard';


const Lists = ({ listsInfo }) => {
    const username = useParams().username?.toLowerCase()
    const user = useSelector(state => state.users.byUsername[username])
    const { listsType, listsTitle } = listsInfo
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists.all)
    const listsFrame = useSelector(state => state.lists[listsType])

    useEffect(() => {
        (async () => {
            await dispatch(listActions.runSetFrame(listsType, false, 1000, {user_id: user?.id}))
        })()
    }, [dispatch, listsType])

    return (
        <div className='lists'>
            {lists && Object.keys(listsFrame).map(id => (
                <ListCard
                    key={id}
                    dataKey={id}
                />
            ))}
        </div>
    )
}


export default Lists
