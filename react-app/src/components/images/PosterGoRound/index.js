import React from 'react'

import './PosterGoRound.css'
import Poster from '../Poster'


const PosterGoRound = ({ sources, height }) => {
    return (
        <div
            className='postergoround'
            style={{height}}
        >
            {sources.map((source, i) => (
                <Poster
                    source={source}
                    key={i}
                />
            ))}
        </div>
    )
}


export default PosterGoRound
