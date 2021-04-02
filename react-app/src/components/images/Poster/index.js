import React from 'react'

import './Poster.css'


const Poster = ({ source }) => {
    return (
        <img
            className='poster'
            src={source}
        />
    )
}


export default Poster
