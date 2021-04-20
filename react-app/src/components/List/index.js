import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './List.css'
import * as listDataActions from '../../store/lists'
import * as listActions from '../../store/components/list'
import { formatDateRange } from '../../services/dates'
import Calendar from '../Calendar'
import Host from '../Host'
import TextAreaField from '../input/TextAreaField'
import ListTitle from './ListTitle'


const List = () => {
    const dispatch = useDispatch()
    const { listId } = useParams()

    useEffect(() => {
        dispatch(listDataActions.runAddLists([listId]))
    }, [dispatch, listId])

    const editMode = useSelector(state => state.components.List.editMode.has(listId))
    const rendered = {
        val: useSelector(state => state.components.List.rendered.has(listId)),
        set: () => dispatch(listActions.setRendered(listId)),
    }

    const list = useSelector(state => state.lists.all[listId])
    useSelector(state => state.lists.all[listId]?.picks.length)

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

    if (!list) return null

    if (!rendered.val) {
        title.set(list.title)
        editorial.set(list.editorial)
        published.set(list.published)
        rendered.set()
    }

    const dates = formatDateRange(list.start_date_sort, list.end_date_sort)
    // because we're just adding the pick to existing list, days are not updating since these values are return from the list model
    console.log('   :::DATES:::   ', dates);

    return (
        <div className='list flex-column-med'>
            <ListTitle />
            <div className='list__date'>{dates}</div>
            <Host host={list.host} />
            {editMode ? (
                    <TextAreaField
                        height='auto'
                        val={editorial.val}
                        setVal={editorial.set}
                    />
                ) : (
                    <div className='list__editorial'>{list.editorial}</div>
                )}
            <Calendar
                listStartSort={list.start_date_sort}
                listId={list.id}
            />
        </div>
    )
}


export default List
