import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Lists.css'
import * as listActions from '../../store/lists'
import ListCard from '../ListCard';


const Lists = ({ slice }) => {
    const dispatch = useDispatch()
    const lists = useSelector(state => Object.values(state.lists[slice]))
    const listsMedia = useSelector(state => Object.values(state.lists[`${slice}Media`]))
    const [mediaLoaded, setMediaLoaded] = useState(false)

    useEffect(() => {
        switch (slice) {
            case 'next':
                (async () => {
                    await dispatch(listActions.addNext(20, slice, true))
                    setMediaLoaded(true)
                })()
                break;
            default:
                break;
        }
    }, [dispatch, slice])

    return (
        <div className='lists'>
            {lists && lists.map((list, i) => (
                <ListCard key={list.id} list={list} listMedia={listsMedia[i]}/>
            ))}
        </div>
    )
}


export default Lists
