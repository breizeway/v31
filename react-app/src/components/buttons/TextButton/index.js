import React from 'react'

import './TextButton.css'


const TextButton = ({content, action}) => {
    return (
        <div
            className='text-button'
            onClick={() => action()}
        >
            {content}
        </div>
    )
}


export default TextButton
