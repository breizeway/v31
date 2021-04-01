import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Lists.css'
import * as listActions from '../../store/lists'
import ListCard from '../ListCard';


const Lists = ({ slice }) => {
    const dispatch = useDispatch()
    const lists = useSelector(state => state.lists[slice])

    useEffect(() => {
        switch (slice) {
            case 'next':
                (async () => {
                    dispatch(listActions.addNext(20, slice, true))
                })()
                break;
            default:
                break;
        }
    }, [dispatch, slice])

    return (
        <div className='lists'>
            {lists && Object.values(lists).map(list => (
                <ListCard key={list.id} list={list}/>
            ))}
        </div>
    )
}


export default Lists
