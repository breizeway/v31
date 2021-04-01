import React from 'react'

import './Poster.css'


const Poster = ({ base_path, path, width }) => {
    return (
        <img
            className='poster'
            src={`${base_path}original${path}`}
            style={{width}}
        />
    )
}


export default Poster
