import React from 'react'

import './Discover.css'
import Lists from '../Lists'


const Discover = () => {
    const listsTypes = [
        'next'
    ]

    return (
        <div className='discover'>
            {listsTypes.map(listsType => (
                <Lists listsType={listsType} key={listsType}/>
            ))}
        </div>
    )
}


export default Discover
