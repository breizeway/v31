import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './MediaSearch.css'
import * as mediaActions from '../../../store/media'
import { setActive } from '../../../store/components/DropDown'
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
    }, [query, dispatch]);

    const chooseFilm = id => {
        setQuery('')
        dispatch(mediaActions.runSetSearchChoice(id))
    }

    const dropDownId = 'MediaSearch'
    const dropDown = {
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDownId))
    }
    const dropDownOptions = {
        initial: [
            {content: 'Keep typing...', click: null},
        ],
        search: searchResults.slice(0, 8).map(result => {
            return {content: `${result.title} ${result.release_date && (`(${result.release_date.slice(0, 4)})`)}`, click: () => chooseFilm(result.id)}
        })
    }

    return (
        <div className='media-search'>
            <div
                className='media-search__form'
            >
                <div className='media-search__field form-field'>
                    <input
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
                    dropDown.val === dropDownId && <DropDown options={dropDownOptions.initial}/>
                ) : searchResults && (
                    dropDown.val === dropDownId && <DropDown options={dropDownOptions.search}/>

                )
            )}
        </div>
    )
}


export default MediaSearch
