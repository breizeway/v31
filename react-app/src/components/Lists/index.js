import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Lists.css'
import * as listActions from '../../store/lists'
import ListCard from '../ListCard';


const Lists = ({ listsType }) => {
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists.all)
    const listsFrame = useSelector(state => state.lists[listsType])
    const [listsTitle, setListsTitle] = useState('')

    useEffect(() => {
        switch (listsType) {
            case 'next':
                (async () => {
                    await dispatch(listActions.runSetNext(20, true)) // change false back to true
                })()
                setListsTitle('Upcoming')
                break;
            default:
                break;
        }
    }, [dispatch, listsType])

    return (
        <div className='lists'>
            {listsTitle}
            {lists && Object.keys(listsFrame).map(id => (
                // <div>{JSON.stringify(list)}</div>
                <ListCard
                    key={parseInt(id)}
                    dataKey={parseInt(id)}
                />
            ))}
        </div>
    )
}


export default Lists
