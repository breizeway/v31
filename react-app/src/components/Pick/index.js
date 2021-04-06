import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import MediaSearch from '../forms/MediaSearch'
import * as pickActions from '../../store/picks'
import * as mediaActions from '../../store/media'


const Pick = ({ listId, day }) => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    // check if this day for this list has a pick associated with it
    // assign it to pick, if so
    const pickId = useSelector(state => {
        const exists = Object.keys(state.lists.all[listId]?.picks_by_date).includes(day.sort)
        if (exists) return state.lists.all[listId].picks_by_date[day.sort].id
        return null
    })
    const hasPick = pickId !== null
    const pick = useSelector(state => state.picks.allMedia[pickId])
    ////

    // get the media chosen from MediaSearch,
    // then get the staged pick once it's been created from the media
    const chosenMedia = useSelector(state => state.media.searchChoice)
    const stagedPick = useSelector(state => state.picks.staged)
    ////

    const [editMode, setEditMode] = useState(!hasPick)
    const [editorial, setEditorial] = useState('')

    const clearSearch = useCallback(() => {
        dispatch(pickActions.stagePick(null));
        dispatch(mediaActions.clearSearchResults());
    }, [dispatch])

    // clear prior search results
    // add the media data to the pick data
    // If chosenMedia changes, stage it (create a pick object like the one you'd get back from the db)
    // mark the component as ready to load
    useEffect(() => {
        clearSearch();
        (async () => {
            await dispatch(pickActions.runAddPicksMedia([pickId]))
            if (chosenMedia) {
                await dispatch(pickActions.runStagePick(chosenMedia, '', listId, day.sort))
            }
        })()
        setLoaded(true)
    }, [chosenMedia, editMode, dispatch, clearSearch, day.sort, listId, pickId])
    ////

    // if there is a staged pick for this day and list,
    // data is that staged pick, otherwise it's the existing pick
    const stagedPickExists = (
        stagedPick?.date_sort === day.sort &&
        stagedPick?.list_id === listId
    )
    const data = stagedPickExists ? stagedPick : pick
    ////

    useEffect(() => {
        setEditorial(data?.editorial)
    }, [data])

    if (!loaded && !hasPick) return null

    // -------------------------------- \\

    const commitPick = async () => {

    }


    const clearPick = async () => {
        clearSearch()
        if (hasPick) setEditMode(false)
    }


    return (
        <div className='pick'>
            {editMode && (
                <MediaSearch />
            )}
            {data && (
                <>
                    <div>{data.title}</div>
                    <div>{data.media_data?.overview}</div>
                    <div>{editorial}</div>
                </>
            )}
            {editMode ? (
                <>
                    <div onClick={commitPick}>save</div>
                    <div onClick={clearPick}>cancel</div>
                </>
            ) : (
                <div onClick={() => setEditMode(!editMode)}>edit</div>
            )}
        </div>
    )
}


export default Pick
