import React from 'react'

import './Poster.css'


const Poster = ({ source, height }) => {
    return (
        <img
            className='poster'
            src={source}
            style={{height}}
        />
    )
}


export default Poster
