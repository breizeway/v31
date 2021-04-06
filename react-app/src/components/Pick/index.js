import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import MediaSearch from '../forms/MediaSearch'
import * as pickActions from '../../store/picks'
import * as mediaActions from '../../store/media'


const Pick = ({ listId, day }) => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    const pickId = useSelector(state => {
        const exists = Object.keys(state.lists.all[listId]?.picks_by_date).includes(day.sort)
        if (exists) return state.lists.all[listId].picks_by_date[day.sort].id
        return null
    })
    const hasPick = pickId !== null
    const pick = useSelector(state => state.picks.allMedia[pickId])
    const chosenMedia = useSelector(state => state.media.searchChoice)
    const stagedPick = useSelector(state => state.picks.staged)

    const [editMode, setEditMode] = useState(!hasPick)


    useEffect(() => {
        clearSearch();
        (async () => {
            await dispatch(pickActions.runAddPicksMedia([pickId]))
            if (chosenMedia) {
                await dispatch(pickActions.runStagePick(chosenMedia, '', listId, day.sort))
            }
        })()
        setLoaded(true)
    }, [chosenMedia, editMode, dispatch])

    const stagedPickExists = (
        stagedPick?.date_sort === day.sort &&
        stagedPick?.list_id === listId
    )

    const data = stagedPickExists ? stagedPick : pick

    const commitPick = async () => {

    }

    const clearSearch = () => {
        dispatch(pickActions.stagePick(null));
        dispatch(mediaActions.clearSearchResults());
    }

    const clearPick = async () => {
        clearSearch()
        if (hasPick) setEditMode(false)
    }

    if (!loaded && !hasPick) return null

    return (
        <div className='pick'>
            {editMode && (
                <MediaSearch />
            )}
            {data && (
                <div>{data.title}</div>
                )}
            {editMode ? (
                <>
                    <div>save</div>
                    <div onClick={clearPick}>cancel</div>
                </>
            ) : (
                <div onClick={() => setEditMode(!editMode)}>edit</div>
            )}
        </div>
    )
}


export default Pick
