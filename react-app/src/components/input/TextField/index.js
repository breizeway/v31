import React from 'react'

import './TextField.css'
import '../input.css'


const TextField = ({
    height='var(--size__big-space)',
    fontSize='inherit',
    val='',
    setVal= (e) => null,
    placeholder='',
    max=100,
}) => {
    return (
        <div
            className='input-field text-field'
            style={{
                height,
                fontSize,
                borderRadius: height === 'auto' ? 'calc(var(--size__big-space) / 4)' : 'calc(var(--size__big-space) / 2)',
            }}
        >
            <input
                className='input-input text-field-input'
                type='text'
                value={val}
                onChange={e => e.target.value.length <= max ? setVal(e.target.value) : null}
                placeholder={placeholder}
            />
        </div>
    )
}


export default TextField
