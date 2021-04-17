import React from 'react'

import './TextField.css'


const TextField = ({
    height='var(--size__big-space)',
    fontSize='inherit',
    val='',
    setVal=null,
    placeholder='',
}) => {
    return (
        <div
            className='text-field'
            style={{height, fontSize}}
        >
            <input
                className='text-field-input'
                type='text'
                value={val}
                onChange={e => setVal(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}


export default TextField
