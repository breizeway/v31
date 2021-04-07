import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import MediaSearch from '../forms/MediaSearch'
import * as pickActions from '../../store/picks'
import * as mediaActions from '../../store/media'
import * as listActions from '../../store/lists'


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
        setEditorial('')
    }, [dispatch])

    // clear prior search results
    // add the media data to the pick data
    // If chosenMedia changes, stage it (create a pick object like the one you'd get back from the db)
    // mark the component as ready to load
    useEffect(() => {
        if (!editMode) clearSearch();
        (async () => {
            await dispatch(pickActions.runAddPicksMedia([pickId]))
            if (chosenMedia) {
                await dispatch(pickActions.runStagePick(
                    chosenMedia, // ? chosenMedia : pick?.media_data,
                    '',
                    listId,
                    day.sort
                ))
            }
        })()
        setLoaded(true)
    }, [chosenMedia, editMode, dispatch, clearSearch, day.sort, listId, pickId])

    // if there is a staged pick for this day and list,
    // data is that staged pick, otherwise it's the existing pick
    const stagedPickExists = (
        stagedPick?.date_sort === day.sort &&
        stagedPick?.list_id === listId
    )
    let data = stagedPickExists ? stagedPick : pick
    ////

    // sets the textarea initial value
    useEffect(() => {
        setEditorial(data?.editorial)
    }, [data])
    ////

    if (!loaded && !hasPick) return null

    // -------------------------------- \\

    const commitPick = async () => {
        let finalStagedPick
        if (chosenMedia) {
            finalStagedPick = await dispatch(pickActions.runStagePick(
                chosenMedia,
                editorial,
                listId,
                day.sort
            ))
        }
        else if (pick.media_data) {
            finalStagedPick = await dispatch(pickActions.runStagePick(
                pick.media_data,
                editorial,
                listId,
                day.sort
            ))
        }

        await dispatch(pickActions.runCommitPick(finalStagedPick))

        // update ListDay
        await dispatch(listActions.runAddLists([listId]))
        dispatch(pickActions.stagePick(null));
        setEditMode(false)
    }

    const clearPick = async () => {
        clearSearch()
        if (hasPick) setEditMode(false)
    }

    const deletePick = async () => {
        clearSearch()
        await dispatch(pickActions.runDeletePick([pick.id]));
        await dispatch(listActions.runAddLists([listId]))
        setEditMode(true)
    }


    return (
        <div className='pick flex-column-med'>
            {editMode && (
                <MediaSearch />
            )}
            {data && (
                <>
                    <div className='header-1'>{data.title}</div>
                    <div>{data.media_data?.overview}</div>
                </>
            )}
            {editMode ? (
                <div className='form-field'>
                    <textarea
                        value={editorial}
                        onChange={e => setEditorial(e.target.value)}
                    />
                </div>
            ) : pick && (
                <div>{pick?.editorial}</div>
            )}
            <div className='pick__edit-controls'>
                {editMode ? (
                    <>
                        <div onClick={commitPick}>save</div>
                        <div onClick={clearPick}>cancel</div>
                        {hasPick && (
                            <div onClick={deletePick}>delete</div>
                        )}
                    </>
                ) : (
                    <div onClick={() => setEditMode(!editMode)}>edit</div>
                )}
            </div>
        </div>
    )
}


export default Pick
