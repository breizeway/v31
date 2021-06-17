import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './NewList.css'
import * as listActions from '../../../store/lists'
import * as modalActions from '../../../store/components/modal'


const NewList = () => {
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    const [editorial, setEditorial] = useState('')
    const [newList, setNewList] = useState(null)

    const submit = async e => {
        e.preventDefault()
        const list = await dispatch(listActions.runNewList(title, editorial/*, startDate, endDate*/))
        setNewList(list)
    }

    if (newList) {
        dispatch(modalActions.removeActive('NavAdd/newList'))
        return <Redirect to={`/lists/${newList.id}`} />
    }

    return (
        <div className='new-list'>
            <form onSubmit={submit} className='space-col-big'>
                <div className='header-2'>Add New List</div>
                <div className='form-field'>
                    <input
                        className='modal-focus'
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='title'
                    ></input>
                </div>
                <div className='pick__editorial-edit form-field'>
                    <textarea
                        value={editorial}
                        onChange={e => setEditorial(e.target.value)}
                        placeholder='editorial'
                    ></textarea>
                </div>
                <div>
                    <div className='button-big'>
                        <input type='submit' value='Add' />
                    </div>
                </div>
            </form>
        </div>
    )
}


export default NewList
