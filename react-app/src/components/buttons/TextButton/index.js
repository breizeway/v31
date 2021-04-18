import React from 'react'

import './TextButton.css'
import '../buttons.css'


const TextButton = ({content, action}) => {
    return (
        <div
            className='button text-button'
            onClick={() => action()}
        >
            {content}
        </div>
    )
}


export default TextButton
