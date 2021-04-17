import React from 'react'

import './TextAreaField.css'
import '../input.css'


const TextAreaField = ({
    height='var(--size__big-space)',
    fontSize='inherit',
    val='',
    setVal=null,
    placeholder='',
    max=Infinity,
}) => {
    return (
        <div
            className='input-field textarea-field'
            style={{
                height,
                fontSize,
                borderRadius: height === 'auto' ? 'calc(var(--size__big-space) / 4)' : 'calc(var(--size__big-space) / 2)',
            }}
        >
            <textarea
                className='input-input textarea-field-input'
                value={val}
                onChange={e => e.target.value.length <= max ? setVal(e.target.value) : null}
                placeholder={placeholder}
            />
        </div>
    )
}


export default TextAreaField
