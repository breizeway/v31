import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import MediaSearch from '../forms/MediaSearch'
import Backdrop from '../images/Backdrop'
import * as pickActions from '../../store/picks'
import * as mediaActions from '../../store/media'
import * as listActions from '../../store/lists'
import ButtonGroup from '../buttons/ButtonGroup'
import TextButton from '../buttons/TextButton'


const Pick = ({ listId, day, pickId }) => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false)

    const hasPick = pickId !== null
    const pick = useSelector(state => state.picks.allMedia[pickId])

    const loggedIn = useSelector(state => state.session.loggedIn)
    const user = useSelector(state => state.session.user)
    const list = useSelector(state => state.lists.all[listId])
    const owned = loggedIn && user.id === list.host.id

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

        // update Calendar
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
                    <div className='header-2'>{`${data.title} ${data.year && (`(${data.year.slice(0, 4)})`)}`}</div>
                    <div className='pick__backdrop'>
                        <Backdrop className='test' source={`https://image.tmdb.org/t/p/original${data.media_data?.backdrop_path}`} />
                    </div>
                    <div>
                        <div className='text-explanation-small'>overview</div>
                        <div>{data.media_data?.overview}</div>
                    </div>
                </>
            )}
                {editMode ? (
                <div className='pick__editorial-edit form-field'>
                    <textarea
                        value={editorial}
                        placeholder='editorial...'
                        onChange={e => setEditorial(e.target.value)}
                    />
                </div>
            ) : pick?.editorial && (
                <div>
                    <div className='text-explanation-small'>editorial</div>
                    <div>{pick?.editorial}</div>
                </div>
            )}
            {owned && <div className='pick__edit-controls'>
                {editMode ? (
                    <>
                        {/* {hasPick && (
                            <div className='button-big' onClick={deletePick}>delete</div>
                        )}
                        <div className='pick__edit-group'>
                            <div className='button-big' onClick={clearPick}>cancel</div>
                            <div className='button-big' onClick={commitPick}>save</div>
                        </div> */}
                        {hasPick && (
                            <TextButton content='Delete' action={deletePick}/>
                        )}
                        <ButtonGroup>
                            <TextButton content='Cancel' action={clearPick}/>
                            <TextButton content='Save' action={commitPick}/>
                        </ButtonGroup>

                    </>
                ) : (
                    <div className='pick__edit-group'>
                        <TextButton content='Edit' action={() => setEditMode(!editMode)}/>
                    </div>
                )}
            </div>}
        </div>
    )
}


export default Pick
