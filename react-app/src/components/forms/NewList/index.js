import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './NewList.css'
import * as listActions from '../../../store/lists'


const NewList = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [newList, setNewList] = useState(null)

    const submit = async e => {
        e.preventDefault()
        const list = await dispatch(listActions.runNewList(title, description, startDate, endDate))
        setNewList(list)
        // return <Redirect to={`/my/lists/${addedList.id}/edit`} />
    }

    if (newList) {
        return <Redirect to={`/my/lists/${newList.id}/edit`} />
    }

    return (
        <div className='new-list'>
            <h2>Add New List</h2>
            <form onSubmit={submit}>
                <div>
                    <input
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='title'
                    ></input>
                </div>
                <div>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='description'
                    ></textarea>
                </div>
                <div>
                    <input
                        type='date'
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        placeholder='start date'
                    ></input>
                </div>
                <div>
                    <input
                        type='date'
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        placeholder='end date'
                    ></input>
                </div>
                <div>
                    <button type='submit'>Add</button>
                </div>
            </form>
        </div>
    )
}


export default NewList
