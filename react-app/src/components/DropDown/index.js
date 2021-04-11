import React from 'react'

import './DropDown.css'


const DropDown = ({ content }) => {
    return (
        <div className='dropdown'>
            {conent.map((listItem, i) => (
                <div key={i}>
                    {listItem}
                </div>
            ))}
        </div>
    )
}


export default DropDown
