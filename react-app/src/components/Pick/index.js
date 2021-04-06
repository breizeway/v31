import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import { makeDay } from '../../services/dates'
import NewPick from '../forms/NewPick'
import * as pickActions from '../../store/picks'


const Pick = ({ listId, day }) => {
    console.log('   :::DAY:::   ', day);
    const dispatch = useDispatch()

    const chosenMedia = useSelector(state => state.media.searchChoice)
    const picks = useSelector(state => {
        return Object.values(state.picks.all).filter(pick => {
            const inList = pick.list_id === listId
            const onDate = makeDay(pick.date).sort === day.sort
            return inList && onDate
        })
    })

    useEffect(() => {
        if (chosenMedia) {
            (async () => {
                await dispatch(pickActions.runStagePick(chosenMedia, '', listId, day.obj))
            })()
        }
    }, [chosenMedia])

    const hasPick = picks.length !== 0
    const [editMode, setEditMode] = useState(!hasPick)

    const pick = hasPick && picks[0]

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
