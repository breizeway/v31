import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './List.css'
import * as listActions from '../../store/lists'
import { activateEditMode, deactivateEditMode } from '../../store/components/list'
import { formatDateRange } from '../../services/dates'
import { setActive } from '../../store/components/dropDown'
import Calendar from '../Calendar'
import Host from '../Host'
import DropDown from '../DropDown'


const List = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { listId } = useParams()

    useSelector(state => state.components.List.editMode.size) // makes sure a rerender happens when the set changes size
    const editMode = useSelector(state => state.components.List.editMode.has(listId))

    const list = useSelector(state => state.lists.all[listId])
    const user = useSelector(state => state.session.user)
    const owned = list?.host.id === user?.id

    const deleteList = () => {
        const confirmed = window.confirm('Are you sure you want to delete this list?\nThis action cannot be reversed.')
        if (!confirmed) return
        history.push('/')
        dispatch(listActions.runDeleteLists([listId]))
    }

    /* dropdown */
    const dropDownId = `List/${listId}/edit`
    const dropDown = {
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDownId))
    }
    const dropDownOptions = [
        {content: 'Edit', click: () => dispatch(activateEditMode(listId))},
        {content: 'Delete', click: () => deleteList()},
    ]
    /***********/

    useEffect(() => {
        (async () => {
            await dispatch(listActions.runAddLists([listId]))
        })()
    }, [dispatch, listId])

    if (!list) return null

    const dates = formatDateRange(list.start_date_sort, list.end_date_sort)

    return (
        <div className='list flex-column-med'>
            <div className='list__title'>
                {editMode ? (
                    <div />
                ) : (
                    <div className='header-1'>{list.title}</div>
                )}
                {owned && (
                    editMode ? (
                        <div className='x-button-group'>
                            <div className='button-big' onClick={() => dispatch(deactivateEditMode(listId))} >cancel</div>
                            <div className='button-big' >save</div>
                        </div>
                    ) : (
                        <div>
                            <div
                                className='icon-big'
                                onClick={() => dropDown.set()}
                            >
                                <i className='fas fa-ellipsis-h' />
                            </div>
                            {dropDown.val === dropDownId && (
                                <DropDown options={dropDownOptions} justify='right'/>
                            )}
                        </div>
                    )
                )}
            </div>
            <div className='list__date'>{dates}</div>
            <Host host={list.host} />
            <div className='list__editorial'>{list.editorial}</div>
            <Calendar
                listStartSort={list.start_date_sort}
                listId={list.id}
            />
        </div>
    )
}


export default List
