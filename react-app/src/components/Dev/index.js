import React, { useState, useEffect } from 'react';

import './Dev.css';


const Dev = () => {
    const [query, setQuery] = useState('');
    const [queried, setQueried] = useState(query);

    const [id, setId] = useState(null)

    const [data, setData] = useState([]);
    const [chosen, setChosen] = useState({});

    useEffect(() => {
        if (queried.length > 2) {
            (async () => {
                const response = await fetch(`/api/media/search?query=${queried}`)
                if (response.ok) {
                    const movies = await response.json(); // get both standardized and raw rss feed
                    setData(movies)
                }
                setQuery('')
                setChosen(null)
            })();
            (async () => {
                const response = await fetch(`/api/media/config`)
                if (response.ok) {
                    const config = await response.json(); // get both standardized and raw rss feed
                }
            })();
        }
    }, [queried]);

    useEffect(() => {
        if (id) {
            (async () => {
                const response = await fetch(`/api/media/${id}`)
                if (response.ok) {
                    const movie = await response.json(); // get both standardized and raw rss feed
                    setChosen(movie)
                }
            })();
        }
    }, [id]);

    const search = e => {
        e.preventDefault()
        setQueried(query)
    }

    return (
        <div className='search'>
            <form onSubmit={search}>
                <input
                    type='text'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
            <div className='search__chosen'>
                <h2>{chosen?.title}</h2>
                {chosen && Object.keys(chosen).map((key, i) => (
                    <div key={i}>
                        <strong>{key}&nbsp;</strong><span>{JSON.stringify(chosen[key])}</span>
                    </div>
                ))}
            </div>
            <div className='search__results'>
                {data && data.results?.map(film => (
                    <div key={film.id} className='search__film' onClick={() => setId(film.id)}>
                        <h2>{film.title}&nbsp;({film.release_date?.slice(0, 4)})</h2>
                        {film.poster_path && <img
                            src={`${'https://image.tmdb.org/t/p/original'}${film.poster_path}`}
                            style={{width: '100%', height: 'auto'}}
                            alt='Original movie poster for the chosen film'
                            />}
                        <div>
                            <span><strong>ID:&nbsp;</strong>{film.id}</span>
                        </div>
                        <div>
                            <span><strong>Overview:&nbsp;</strong>{film.overview.slice(0, 200)}...</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};


export default Dev;
