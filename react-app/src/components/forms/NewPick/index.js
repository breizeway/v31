import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './NewPick.css'
import * as pickActions from '../../../store/picks'
import MediaSearch from '../MediaSearch'


const NewPick = () => {
    const dispatch = useDispatch()
    const chosenMedia = useSelector(state => state.media.searchChoice)
    console.log('   :::CHOSENMEDIA:::   ', chosenMedia);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState(null)
    const [originalPoster, setOriginalPoster] = useState(null)
    const [date, setDate] = useState(new Date())
    const [mediaId, setMediaId] = useState(null)
    const [imdbaId, setImdbaId] = useState(null)
    const [newPick, setNewPick] = useState(null)

    const submit = async e => {
        e.preventDefault()
        // const pick = await dispatch(pickActions.runNewPick(title, overview, date))
        // setNewPick(pick)
    }

    if (newPick) {
        // return <Redirect to={`/my/lists/${newList.id}`} />
    }

    return (
        <div className='new-pick'>
            <form onSubmit={submit}>
                <MediaSearch />
                {chosenMedia && JSON.stringify(chosenMedia)}
            </form>
        </div>
    )
}


export default NewPick
