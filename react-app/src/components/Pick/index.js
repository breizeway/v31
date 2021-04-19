import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import './Pick.css'
import MediaSearch from './MediaSearch'
import PickOptions from './PickOptions'
import Backdrop from '../images/Backdrop'
import * as pickDataActions from '../../store/picks'
import * as mediaActions from '../../store/media'
import * as listDataActions from '../../store/lists'
import * as pickActions from '../../store/components/pick'
import ButtonGroup from '../buttons/ButtonGroup'
import TextButton from '../buttons/TextButton'


const Pick = ({ listId, day, pickId=0 }) => {
    const dispatch = useDispatch()

    // state vars
    const hasPick = pickId !== 0
    const pick = {
        val: useSelector(state => state.lists.all[listId].picks_by_date[day.sort]),
        set: () => {
            dispatch(listDataActions.runSetMediaPick(listId, day))
        }
    }

    useEffect(() => {
        if (hasPick) pick.set()
    }, [hasPick])

    const editMode = {
        val: useSelector(state => state.components.Pick.editMode.has(pickId)),
        set: () => dispatch(pickActions.activateEditMode(pickId)),
        rmv: () => dispatch(pickActions.deactivateEditMode(pickId)),
    }

    const rendered = {
        val: useSelector(state => state.components.Pick.rendered.has(pickId)),
        set: () => dispatch(pickActions.setRendered(pickId)),
    }

    const list = useSelector(state => state.lists.all[listId])

    const title = {
        val: useSelector(state => state.components.Pick.title[pickId]),
        set: (title) => dispatch(pickActions.setTitle(pickId, title)),
    }

    const editorial = {
        val: useSelector(state => state.components.Pick.editorial[pickId]),
        set: (editorial) => dispatch(pickActions.setEditorial(pickId, editorial)),
    }

    const loggedIn = useSelector(state => state.session.loggedIn)
    const user = useSelector(state => state.session.user)

    // standard vars
    const owned = loggedIn && user.id === list.host.id

    if (!rendered.val) {
        dispatch(pickActions.setQuery(pickId, ''))
    }

    if (!rendered.val) {

        if (hasPick) {
            title.set(list.title)
            editorial.set(pick.val.editorial)

        }
        else {
            title.set('')
            editorial.set('')
            editMode.set()

        }

        rendered.set()
    }

    return (
        <div className='pick'>
            {editMode.val && <MediaSearch pickId={pickId} />}
            <PickOptions listId={listId} pickId={pickId} />
        </div>
    )
}


export default Pick
