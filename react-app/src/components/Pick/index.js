import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import MediaSearch from '../forms/MediaSearch'
import Backdrop from '../images/Backdrop'
import * as pickDataActions from '../../store/picks'
import * as mediaActions from '../../store/media'
import * as listDataActions from '../../store/lists'
import * as pickActions from '../../store/components/pick'
import ButtonGroup from '../buttons/ButtonGroup'
import TextButton from '../buttons/TextButton'


const Pick = ({ listId, day, pickId }) => {
    const dispatch = useDispatch()

    // state vars
    const hasPick = pickId !== null
    const pick = {
        val: useSelector(state => state.lists.all[listId].picks_by_date[day.sort]),
        set: () => {
            dispatch(listDataActions.runSetMediaPick(listId, day))
        }
    }

    useEffect(() => {
        if (hasPick) pick.set()
    }, [hasPick])
    // makes sure a rerender happens when the set changes size
    useSelector(state => state.components.Pick.editMode.size)

    const editMode = useSelector(state => state.components.Pick.editMode.has(pickId))
    const rendered = {
        val: useSelector(state => state.components.Pick.rendered.has(pickId)),
        set: () => dispatch(pickActions.setRendered(pickId)),
    }

    const list = useSelector(state => state.lists.all[listId])

    const editorial = {
        val: useSelector(state => state.components.Pick.editorial[pickId]),
        set: (editorial) => dispatch(pickActions.setEditorial(pickId, editorial)),
    }

    const loggedIn = useSelector(state => state.session.loggedIn)
    const user = useSelector(state => state.session.user)

    // standard vars
    const owned = loggedIn && user.id === list.host.id

    if (!hasPick) return (
        <MediaSearch />
    )

    if (!rendered.val) {
        // title.set(list.title)
        editorial.set(pick.val.editorial)
        rendered.set()
    }

    const pickChanged = (() => {
        return (
            editorial.val !== pick.val.editorial
        )
    })()
    console.log('   :::PICKCHANGED:::   ', pickChanged);

    return null
}


export default Pick
