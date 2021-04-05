import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './MediaSearch.css'
import * as mediaActions from '../../../store/media'


const MediaSearch = () => {
    const dispatch = useDispatch()

    const [query, setQuery] = useState('')
    const [mediaId, setMediaId] = useState(null)
    console.log('   :::MEDIAID:::   ', mediaId);
    const searchResults = useSelector(state => state.media.searchResults)

    useEffect(() => {
        if (query.length === 0) dispatch(mediaActions.clearSearchResults())
        else if (query.length >= 3) {
            (async () => {
                await dispatch(mediaActions.runSetSearchResults(query))
            })();
        }
    }, [query, dispatch]);

    const selectFilm = id => {
        setMediaId(id)
        setQuery('')
    }

    const search = e => {
        console.log('SEARCH')
    }

    const submit = async e => {
        e.preventDefault()
        // const pick = await dispatch(pickActions.runNewPick(title, overview, date))
        // setNewPick(pick)
    }

    // if (!query.length) return null

    return (
        <div className='media-search'>
            <form
                className='media-search__form'
                onSubmit={submit}
            >
                <div>
                    <input
                        type='text'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder='movie title...'
                    ></input>
                    {query.length > 0 && (
                        <div className='media-search__auto-complete'>
                            {query.length >= 1 && query.length <= 2 ? (
                                <div>keep typing...</div>
                            ) : searchResults && (
                                searchResults.slice(0, 3).map(result => (
                                    <div
                                        key={result.id}
                                        onClick={() => selectFilm(result.id)}
                                    >
                                        {result.title} ({result.release_date?.slice(0, 4)})
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}


export default MediaSearch
