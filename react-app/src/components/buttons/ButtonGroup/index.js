import React from 'react'

import './ButtonGroup.css'


const ButtonGroup = ({ children, flexDirection='row' }) => {
    return (
        <div
            className={`button-group${flexDirection === 'row' ? '' : ' button-group-col'}`}
            style={{flexDirection}}
        >
            {children}
        </div>
    )
}


export default ButtonGroup
