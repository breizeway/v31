import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import { makeDay } from '../../services/dates'
import NewPick from '../forms/NewPick'
import * as pickActions from '../../store/picks'
import * as mediaActions from '../../store/media'


const Pick = ({ listId, day }) => {
    const dispatch = useDispatch()

    const chosenMedia = useSelector(state => state.media.searchChoice)
    const picks = useSelector(state => {
        return Object.values(state.picks.allMedia).filter(pick => {
            const inList = pick.list_id === listId
            const onDate = makeDay(pick.date).sort === day.sort
            return inList && onDate
        })
    })
    const stagedPick = useSelector(state => state.picks.staged)

    const hasPick = picks.length !== 0
    const [editMode, setEditMode] = useState(!hasPick)

    let pick = hasPick && picks[0]
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
            {hasPick && (
                <>
                    <div onClick={() => setEditMode(!editMode)}>edit</div>
                    <div>{JSON.stringify(pick)}</div>
                </>
            )}
        </div>
    )
}


export default Pick
