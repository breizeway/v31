import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './NewPick.css'
import MediaSearch from '../MediaSearch'


const NewPick = () => {
    const chosenMedia = useSelector(state => state.media.searchChoice)

    const submit = async e => {
        e.preventDefault()
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
