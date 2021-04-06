import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './MediaSearch.css'
import * as mediaActions from '../../../store/media'


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
                        placeholder='search for film...'
                    ></input>
                    {query.length > 0 && (
                        <div className='media-search__autocomplete'>
                            {query.length >= 1 && query.length <= 2 ? (
                                <div>keep typing...</div>
                            ) : searchResults && (
                                searchResults.slice(0, 5).map(result => (
                                    <div
                                        className='media-search__autocomplete-row'
                                        key={result.id}
                                        onClick={() => chooseFilm(result.id)}
                                    >
                                        <div>{result.title} {result.release_date && (`(${result.release_date.slice(0, 4)})`)}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                    <div className='icon'>
                        <i className='fas fa-search' />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MediaSearch