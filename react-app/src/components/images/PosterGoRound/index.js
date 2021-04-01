import React from 'react'

import './PosterGoRound.css'
import Poster from '../Poster'


const PosterGoRound = ({ sources }) => {
    return (
        <div className='postergoround'>
            {sources.map((source, i) => (
                <Poster
                    source={source}
                    height={'200px'}
                    key={i}
                />
            ))}
        </div>
    )
}


export default PosterGoRound
