import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import './Search.css';


const Search = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);

    const [query, setQuery] = useState('');
    const [queried, setQueried] = useState(query);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (queried.length > 2) {
            (async () => {
                const response = await fetch(`/api/media/search?query=${queried}`)
                if (response.ok) {
                    const movies = await response.json(); // get both standardized and raw rss feed
                    setData(movies)
                }
                setLoaded(true);
            })();
        }
    }, [dispatch, queried]);

    const update = e => {
        e.preventDefault()
        setQueried(query)
        setQuery('')
        setQueried(query)
    }

    // if (!loaded) return null

    return (
        <div className='search'>
            <form onSubmit={update}>
                <input
                    type='text'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
            {data && data.results?.map((film, i) => (
                <div key={i} className='search__film'>
                    <h2>{film.title}</h2>
                    <img
                        src={`${'https://image.tmdb.org/t/p/original'}${film.poster_path}`}
                        style={{width: '200px', height: 'auto'}}
                        alt='Original movie poster for the chosen film'
                    />
                    {Object.keys(film).map((key, i) => (
                        <div key={i}>
                            <strong>{key}:&nbsp;</strong>
                            <span>{JSON.stringify(film[key])}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
};


export default Search;
