import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import { makeDay } from '../../services/dates'
import NewPick from '../forms/NewPick'
import * as pickActions from '../../store/picks'
import * as mediaActions from '../../store/media'


const Pick = ({ listId, day }) => {
    const dispatch = useDispatch()

    const pick = useSelector(state => {
        const exists = Object.keys(state.lists.allMedia[listId].picks_dates).includes(day.sort)
        if (exists) return state.lists.allMedia[listId].picks_dates[day.sort]
        return null
    })
    const chosenMedia = useSelector(state => state.media.searchChoice)
    const stagedPick = useSelector(state => state.picks.staged)

    const [editMode, setEditMode] = useState(!pick)

    let data = pick
    if (stagedPick) pick = stagedPick

    useEffect(() => {
        if (chosenMedia) {
            (async () => {
                await dispatch(pickActions.runStagePick(chosenMedia, '', listId, day.obj))
            })()
        }
        if (!editMode) {
            dispatch(pickActions.stagePick(null))
            dispatch(mediaActions.clearSearchResults()) // figure out how to clear the staged pick
        }
    }, [chosenMedia, editMode, dispatch])

    return (
        <div className='pick'>
            {editMode && (
                <NewPick />
            )}
            {data && (
                <>
                    <div onClick={() => setEditMode(!editMode)}>edit</div>
                    <div>{JSON.stringify(pick)}</div>
                </>
            )}
        </div>
    )
}


export default Pick
