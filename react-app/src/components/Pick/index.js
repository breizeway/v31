import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Pick.css'
import MediaSearch from './MediaSearch'
import PickOptions from './PickOptions'
import PickEditorial from './PickEditorial'
import Loading from '../Loading'
import Backdrop from '../images/Backdrop'
import * as pickDataActions from '../../store/picks'
import * as mediaActions from '../../store/media'
import * as listDataActions from '../../store/lists'
import * as pickActions from '../../store/components/pick'
import ButtonGroup from '../buttons/ButtonGroup'
import TextButton from '../buttons/TextButton'


const Pick = ({ listId, day, pickIdRaw }) => {
    const pickIdIfNone = `list-${listId}_day-${day.sort}`
    const pickId = pickIdRaw ? pickIdRaw : pickIdIfNone
    const dispatch = useDispatch()

    // state vars
    const hasPick = pickId !== pickIdIfNone
    const pick = {
        val: useSelector(state => state.lists.all[listId].picks_by_date[day.sort]),
        set: async () => {
            await dispatch(listDataActions.runSetMediaPick(listId, day))
        }
    }
    console.log('   :::PICK:::   ', pick.val);
    const chosenPick = {
        val: useSelector(state => state.components.Pick.chosen[pickId]),
        set: () => dispatch(pickActions.setChosen(pickId, null))
    }

    const data = chosenPick.val || pick.val || null
    const hasData = data !== null

    useEffect(() => {
        if (hasPick) pick.set();
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
                    <div className='pick__nothing'>There's nothing here yet...</div>
                )
            )}
            {data?.media_data ? (
                <>
                    {data.media_data.backdrop_path && (
                        <div className='pick__backdrop'>
                            <Backdrop className='test' source={`https://image.tmdb.org/t/p/original${data.media_data.backdrop_path}`} />
                        </div>
                    )}
                    {hasData && data.editorial && (
                        <PickEditorial listId={listId} pickId={pickId} />
                    )}
                    {data.media_data.overview && (
                        <div className='pick__about'>
                            <div className='text-explanation-small'>overview</div>
                            <div className='pick__about-text'>{data.media_data.overview}</div>
                        </div>
                    )}
                    {/* <PickAbout listId={listId} pickId={pickId} /> */}
                </>
            ) : (
                hasData && <Loading size='var(--size__text-1)' />
            )}
            {owned && <PickOptions listId={listId} pickId={pickId} />}
        </div>
    )
}


export default Pick
