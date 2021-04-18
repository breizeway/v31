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

    const hasPick = pickId !== null
    const pick = {
        val: useSelector(state => state.picks.allMedia[pickId]),
        set: () => {
            dispatch(listActions.runSetMediaPick(listId, day))
        }
    }

    const loggedIn = useSelector(state => state.session.loggedIn)
    const user = useSelector(state => state.session.user)
    const list = useSelector(state => state.lists.all[listId])
    const owned = loggedIn && user.id === list.host.id

    useEffect(() => {
        if (pick) pick.set()
    }, [])

    return null

}


export default Pick
