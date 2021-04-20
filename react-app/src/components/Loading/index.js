import React from 'react'

import './Loading.css'


const Loading = ({ size='var(--size__big-space)' }) => {
    return (
        <div
            className='loading'
            style={{
                fontSize: size
            }}
        >
            <i className='fas fa-circle-notch' />
        </div>
    )
}


export default Loading
