import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import './Test.css';


const Test = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);

    const [movieId, setMovieId] = useState('10000');
    const [chosenMovieId, setChosenMovieId] = useState(movieId);



    const [data, setData] = useState({});
    const apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjY5ZDBlYzNhYjNmMTM3YWM4ZjAwZjU1NWE2NWFkZSIsInN1YiI6IjYwNjM2M2U0NmY2YTk5MDA2YWZmMzU0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2Jc0Bfc0P1931bfTrl3xsjQQRoYALsPyCBgEtrDUIi0'
    // /3/configuration

    const resource = `/${'movie'}`
    const detail = `/${''}`
    const url = `https://api.themoviedb.org/3${resource}${`/${movieId}`}`
    useEffect(() => {
        (async () => {
            const response = await fetch(url, {
                headers: {
                    'content-type': 'application/json;charset=utf-8',
                    'authorization': `Bearer ${apiToken}`,

                }
            })
            if (response.ok) {
                const movie = await response.json(); // get both standardized and raw rss feed
                setData(movie)
                console.log(`   :::MOVIE${detail}:::   `, movie);
            }
            setLoaded(true);
        })();
    }, [dispatch, chosenMovieId]);

    const update = e => {
        e.preventDefault()
        setChosenMovieId(movieId)
    }

    if (!loaded) return null

    return data && (
        <div className='test'>
            <form onSubmit={update}>
                <input
                    type='text'
                    value={movieId}
                    onChange={e => setMovieId(e.target.value)}
                />
                <button type='submit'>update</button>
            </form>
            {/* <img src={`${'https://image.tmdb.org/t/p/original'}${data.posters[0].file_path}`} style={{width: '200px', height: 'auto'}}></img> */}
            {Object.keys(data).map(key => (
                <div>
                    <strong>{key}:&nbsp;</strong>
                    <span>{JSON.stringify(data[key])}</span>
                </div>
            ))}
        </div>
    )
};


export default Test;
