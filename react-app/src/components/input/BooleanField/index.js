import React from 'react'

import './BooleanField.css'
import '../input.css'


const BooleanField = ({
    val = false,
    setVal = () => null,
    label = '',
}) => {
    return (
        <div
            className='boolean-field'
            onClick={setVal}
        >
            {label}
            <div
                className='input-field boolean-field-toggle'
                style={{
                    justifyContent: val === true ? 'flex-end' : 'flex-start',
                    marginLeft: label ? 'calc(var(--size__big-space) / 2)' : '0',
                    backgroundColor: val === true ? 'var(--color__theme-1)' : 'var(--color__input)',
                }}
            >
                <div  className='boolean-field-input'/>
            </div>
        </div>
    )
}


export default BooleanField
