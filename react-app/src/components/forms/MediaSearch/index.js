import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './MediaSearch.css'
import * as mediaActions from '../../../store/media'
import { setActive } from '../../../store/components/dropDown'
import DropDown from '../../DropDown'


const MediaSearch = () => {
    const dispatch = useDispatch()

    const [query, setQuery] = useState('')
    const searchResults = useSelector(state => state.media.searchResults)

    useEffect(() => {
        if (query.length === 0) dispatch(mediaActions.clearSearchResults())
        else if (query.length >= 3) {
            (async () => {
                await dispatch(mediaActions.runSetSearchResults(query))
            })();
        }
        const initialInput = document.querySelector('.modal-focus')
        initialInput && initialInput.focus()
    }, [query, dispatch]);

    const chooseFilm = id => {
        setQuery('')
        dispatch(mediaActions.runSetSearchChoice(id))
    }

    const dropDown = {
        thisVal: 'MediaSearch',
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDown.thisVal)),
        options: {
            initial: [
                {content: 'Keep typing...', click: null},
            ],
            search: searchResults.slice(0, 8).map(result => {
                return {content: `${result.title} ${result.release_date && (`(${result.release_date.slice(0, 4)})`)}`, click: () => chooseFilm(result.id)}
            })
        }
    }

    return (
        <div className='media-search'>
            <div
                className='media-search__form'
            >
                <div className='media-search__field form-field'>
                    <input
                        className='modal-focus'
                        type='text'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onClick={dropDown.set}
                        placeholder='search for film...'
                    ></input>
                    <div className='icon-med'>
                        <i className='fas fa-search' />
                    </div>
                </div>
            </div>
            {query.length > 0 && (
                query.length >= 1 && query.length <= 2 ? (
                    dropDown.val === dropDown.thisVal && <DropDown options={dropDown.options.initial}/>
                ) : searchResults && (
                    dropDown.val === dropDown.thisVal && <DropDown options={dropDown.options.search}/>

                )
            )}
        </div>
    )
}


export default MediaSearch
