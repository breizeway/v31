import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './MediaSearch.css'
import * as pickActions from '../../../store/components/pick'
import { setActive } from '../../../store/components/dropDown'
import TextField from '../../input/TextField'
import DropDown from '../../DropDown'


const MediaSearch = ({ listId, pickId, date }) => {
    const dispatch = useDispatch()

    const query = {
        val: useSelector(state => state.components.Pick.query[pickId]),
        set: (query) => dispatch(pickActions.setQuery(pickId, query)),
    }

    const editorial = {
        val: useSelector(state => state.components.Pick.editorial[pickId]),
        set: (editorial) => dispatch(pickActions.setEditorial(pickId, editorial)),
    }

    const chosen = {
        val: useSelector(state => state.components.Pick.chosen[pickId]),
        set: (mediaId) => dispatch(pickActions.runSetChosen(pickId, listId, mediaId, date, editorial.val)),
    }

    const searchResults = {
        val: useSelector(state => state.components.Pick.searchResults[pickId]) || [],
        set: () => dispatch(pickActions.runSetSearchResults(pickId, query.val))
    }

    useEffect(() => {
        if (query.val.length === 0) searchResults.set()
        else if (query.val.length >= 3) {
            searchResults.set()
        }
        const initialInput = document.querySelector('.modal-focus')
        if (initialInput) {
            initialInput.focus()
        }
        dropDown.set()
    }, [query.val, dispatch]);

    const chooseFilm = mediaId => {
        query.set('')
        chosen.set(mediaId)
    }

    const dropDown = {
        thisVal: 'MediaSearch',
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDown.thisVal)),
        options: {
            initial: [
                {content: 'Keep typing...', click: null},
            ],
            search: searchResults.val.slice(0, 8).map(result => {
                return {content: `${result.title} ${result.release_date && (`(${result.release_date.slice(0, 4)})`)}`, click: () => chooseFilm(result.id)}
            })
        }
    }

    return (
        <div className='pick-search'>
            <TextField
                height='auto'
                fontSize='var(--size__text-2)'
                val={query.val}
                setVal={query.set}
                placeholder='Title'
            />
            {query.val.length > 0 && (
                query.val.length >= 1 && query.val.length <= 2 ? (
                    dropDown.val === dropDown.thisVal && <DropDown options={dropDown.options.initial}/>
                ) : searchResults && (
                    dropDown.val === dropDown.thisVal && <DropDown options={dropDown.options.search}/>

                )
            )}
        </div>
    )
}


export default MediaSearch
