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
import ButtonGroup from '../buttons/ButtonGroup'
import TextButton from '../buttons/TextButton'


const List = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { listId } = useParams()

    useEffect(() => {
        dispatch(listActions.runAddLists([listId]))
    }, [dispatch, listId])

    useSelector(state => state.components.List.editMode.size) // makes sure a rerender happens when the set changes size
    const editMode = useSelector(state => state.components.List.editMode.has(listId))

    const list = useSelector(state => state.lists.all[listId])
    const user = useSelector(state => state.session.user)
    const owned = list?.host.id === user?.id

    const deleteList = () => {
        const confirmed = window.confirm('Are you sure you want to delete this list?\nThis action cannot be reversed.')
        if (!confirmed) return
        history.push('/my')
        dispatch(listActions.runDeleteLists([listId]))
    }

    /* dropdown */
    const dropDown = {
        thisVal: `List/${listId}/edit`,
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDown.thisVal)),
        options: [
            {content: 'Edit', click: () => dispatch(activateEditMode(listId))},
            {content: 'Delete', click: () => deleteList()},
        ]
    }

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
                        <ButtonGroup>
                            <TextButton content='Cancel' action={() => dispatch(deactivateEditMode(listId))}/>
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
