import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import MediaSearch from '../forms/MediaSearch'
import * as pickActions from '../../store/picks'
import * as mediaActions from '../../store/media'


const Pick = ({ listId, day }) => {
    const dispatch = useDispatch()


    const pickId = useSelector(state => {
        const exists = Object.keys(state.lists.all[listId]?.picks_by_date).includes(day.sort)
        if (exists) return state.lists.all[listId].picks_by_date[day.sort].id
        return null
    })
    const pick = useSelector(state => state.picks.allMedia[pickId])
    const chosenMedia = useSelector(state => state.media.searchChoice)
    const stagedPick = useSelector(state => state.picks.staged)

    const [editMode, setEditMode] = useState(!pick)
    const [dataChecked, setDataChecked] = useState(false)


    useEffect(() => {
        dispatch(pickActions.stagePick(null));
        dispatch(mediaActions.clearSearchResults());
        (async () => {
            await dispatch(pickActions.runAddPicksMedia([pickId]))
            if (chosenMedia) {
                await dispatch(pickActions.runStagePick(chosenMedia, '', listId, day.sort))
            }
        })()
        setDataChecked(true)
    }, [chosenMedia, editMode, dispatch])

    const stagedPickExists = (
        stagedPick?.date_sort === day.sort &&
        stagedPick?.list_id === listId
    )

    const data = stagedPickExists ? stagedPick : pick

    if (!dataChecked) return null

    return (
        <div className='pick'>
            {editMode && (
                <MediaSearch />
            )}
            {!editMode && (
                <div onClick={() => setEditMode(!editMode)}>edit</div>
            )}
            {data && (
                <div>{JSON.stringify(data)}</div>
            )}
        </div>
    )
}


export default Pick
