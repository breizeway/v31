import React from 'react'

import './IconButton.css'
import '../buttons.css'


const IconButton = ({content, action}) => {
    return (
        <div
            className='button icon-button'
            onClick={() => action()}
        >
            <i className={content}/>
        </div>
    )
}


export default IconButton
