import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import * as listDataActions from '../../../store/lists'
import * as listActions from '../../../store/components/list'
import { setActive } from '../../../store/components/dropDown'
import DropDown from '../../DropDown'
import ButtonGroup from '../../buttons/ButtonGroup'
import TextButton from '../../buttons/TextButton'
import TextField from '../../input/TextField'

import './ListTitle.css'


const ListTitle = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { listId } = useParams()

    useSelector(state => state.components.List.editMode.size) // makes sure a rerender happens when the set changes size
    const editMode = useSelector(state => state.components.List.editMode.has(listId))

    const list = useSelector(state => state.lists.all[listId])
    const user = useSelector(state => state.session.user)
    const owned = list?.host.id === user?.id

    /* dropdown */
    const dropDown = {
        thisVal: `List/${listId}/edit`,
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDown.thisVal)),
        options: [
            {content: 'Edit', click: () => dispatch(listActions.activateEditMode(listId))},
            {content: 'Delete', click: () => deleteList()},
        ]
    }

    const title = {
        val: useSelector(state => state.components.List.title[listId]),
        set: (title) => dispatch(listActions.setTitle(listId, title)),
    }

    const deleteList = () => {
        const confirmed = window.confirm('Are you sure you want to delete this list?\nThis action cannot be reversed.')
        if (!confirmed) return
        history.push('/my')
        dispatch(listDataActions.runDeleteLists([listId]))
    }

    return (
        <div className='list-title'>
            {editMode ? (
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
            {owned && (
                editMode ? (
                    <ButtonGroup>
                        <TextButton content='Cancel' action={() => dispatch(listActions.deactivateEditMode(listId))}/>
                        <TextButton content='Save'/>
                    </ButtonGroup>
                ) : (
                    <div>
                        <div
                            className='icon-big'
                            onClick={() => dropDown.set()}
                        >
                            <i className='fas fa-ellipsis-h' />
                        </div>
                        {dropDown.val === dropDown.thisVal && (
                            <DropDown options={dropDown.options} justify='right'/>
                        )}
                    </div>
                )
            )}
        </div>
    )
}


export default ListTitle
