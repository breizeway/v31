import React from 'react'

import './Backdrop.css'


const Backdrop = ({ source }) => {
    return (
        <img
            className='backdrop'
            src={source}
            alt='movie backdrop'
        />
    )
}


export default Backdrop
