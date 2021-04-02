import React from 'react'

import './Poster.css'


const Poster = ({ source }) => {
    return (
        <img
            className='poster'
            src={source}
            alt='movie poster'
        />
    )
}


export default Poster
