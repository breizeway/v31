import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Lists.css'
import * as listActions from '../../store/lists'
import ListCard from '../ListCard';


const Lists = ({ listsKey, listsTitle }) => {
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists.all)
    const listsFrame = useSelector(state => state.lists[listsKey])

    useEffect(() => {
        (async () => {
            await dispatch(listActions.runSetFrame(listsKey))
        })()
    }, [dispatch])

    return (
        <div className='lists'>
            <div className='lists__title'>
                {listsTitle}
            </div>
            {lists && Object.keys(listsFrame).map(id => (
                <ListCard
                    key={parseInt(id)}
                    dataKey={parseInt(id)}
                />
            ))}
        </div>
    )
}


export default Lists
