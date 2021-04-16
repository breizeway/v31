import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Lists.css'
import * as listActions from '../../store/lists'
import ListCard from '../ListCard';


const Lists = ({ listsInfo }) => {
    const { listsType, listsTitle } = listsInfo
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists.all)
    const listsFrame = useSelector(state => state.lists[listsType])

    useEffect(() => {
        (async () => {
            await dispatch(listActions.runSetFrame(listsType))
        })()
    }, [dispatch, listsType])

    return (
        <div className='lists'>
            <div className='lists__title header-1'>
                {listsTitle}
            </div>
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
