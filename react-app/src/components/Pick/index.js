import React, { useEffect, useState } from 'react'
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
    const [mediaDataLoaded, setMediaDataLoaded] = useState(false)

    // state vars
    const hasPick = pickId !== 0
    const pick = {
        val: useSelector(state => state.lists.all[listId].picks_by_date[day.sort]),
        set: async () => {
            await dispatch(listDataActions.runSetMediaPick(listId, day))
        }
    }
    const chosenPick = {
        val: useSelector(state => state.components.Pick.chosen[pickId]),
        set: () => dispatch(pickActions.setChosen(pickId, null))
    }

    const data = chosenPick.val || pick.val || null
    const hasData = data !== null
    console.log('   :::DATA:::   ', data);

    useEffect(() => {
        if (hasPick) pick.set();
        setMediaDataLoaded(true)
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
    const owned = loggedIn && user.id === list.host.id

    if (!rendered.val) {
        dispatch(pickActions.setQuery(pickId, ''))
    }

    if (!rendered.val) {

        if (hasPick) {
            title.set(`${data.title} (${data.year})`)
            editorial.set(data.editorial)
            chosenPick.set()

        }
        else {
            title.set('')
            editorial.set('')
            editMode.set()
            chosenPick.set()

        }

        rendered.set()
    }

    return (
        <div className='pick flex-column-med'>
            {editMode.val ? (
                <MediaSearch listId={listId} pickId={pickId} date={day.sort} />
            ) : (
                hasPick ? (
                    <div className='header-2'>{`${pick.val.title} (${pick.val.year})`}</div>
                ) : (
                    null
                )
            )}
            {data?.media_data ? (
                <div className='pick__backdrop'>
                    <Backdrop className='test' source={`https://image.tmdb.org/t/p/original${data.media_data.backdrop_path}`} />
                </div>
            ) : (
                null
            )}
            {owned && <PickOptions listId={listId} pickId={pickId} />}
        </div>
    )
}


export default Pick
