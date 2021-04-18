import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import * as listDataActions from '../../../store/lists'
import * as listActions from '../../../store/components/list'
import { setActive } from '../../../store/components/dropDown'
import DropDown from '../../DropDown'
import ButtonGroup from '../../buttons/ButtonGroup'
import IconButton from '../../buttons/IconButton'
import TextField from '../../input/TextField'
import ListControlPanel from './ListControlPanel'

import './ListTitle.css'


const ListTitle = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { listId } = useParams()

    // makes sure a rerender happens when the set changes size
    useSelector(state => state.components.List.editMode.size)
    const editMode = {
        val: useSelector(state => state.components.List.editMode.has(listId)),
        set: () => dispatch(listActions.activateEditMode(listId)),
        rmv: () => dispatch(listActions.deactivateEditMode(listId)),
    }

    const list = useSelector(state => state.lists.all[listId])
    const user = useSelector(state => state.session.user)
    const owned = list?.host.id === user?.id

    /* dropdown */
    const dropDown = {
        thisVal: `List/${listId}/edit`,
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDown.thisVal)),
        options: [
            {content: 'Edit', click: () => editMode.set()},
            {content: 'Delete', click: () => deleteList()},
            {content: '', type: 'divider', click: () => deleteList()},
            {content: <ListControlPanel />, type: 'panel', click: () => null},
        ]
    }

    const title = {
        val: useSelector(state => state.components.List.title[listId]),
        set: (title) => dispatch(listActions.setTitle(listId, title)),
    }

    const editorial = {
        val: useSelector(state => state.components.List.editorial[listId]),
        set: (editorial) => dispatch(listActions.setEditorial(listId, editorial)),
    }

    const published = {
        val: useSelector(state => state.components.List.published[listId]),
        set: (published) => dispatch(listActions.setPublished(listId, published)),
    }

    const deleteList = () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this list?\nThis action cannot be reversed.'
        )
        if (!confirmed) return
        history.push('/my')
        dispatch(listDataActions.runDeleteLists([listId]))
    }

    const saveList = () => {
        dispatch(listDataActions.runEditList(listId, title.val, editorial.val, published.val))
        editMode.rmv()
    }

    // update the datanase when published changes
    useEffect(() => {
        dispatch(listDataActions.runEditList(listId, list.title, list.editorial, published.val))
    }, [dispatch, listId, list.title, list.editorial, published.val])

    return (
        <div className='list-title'>
            <div className='list-title__title'>
                {editMode.val ? (
                    <>
                        <TextField
                            height='auto'
                            fontSize='var(--size__text-1)'
                            val={title.val}
                            setVal={title.set}
                        />
                    </>
                ) : (
                    <div className='header-1'>{list.title}</div>
                )}
            </div>
            <div className='list-title__controls'>
                {owned && (
                    editMode.val ? (
                        <ButtonGroup flexDirection='column'>
                            <IconButton content='fas fa-times' action={() => editMode.rmv()}/>
                            <IconButton content='fas fa-check' action={() => saveList()}/>
                        </ButtonGroup>
                    ) : (
                        <div>
                            <IconButton content='fas fa-ellipsis-h' action={() => dropDown.set()}/>
                            {dropDown.val === dropDown.thisVal && (
                                <DropDown options={dropDown.options} justify='right'/>
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}


export default ListTitle
