import React from 'react'

import './PickDetail.css'


const PickDetail = ({ label, gridArea, scroll, children }) => {
    return (
        <div
            style={{gridArea}}
        >
            <div className='text-explanation-small'>{label}</div>
            <div
                className={scroll ? 'pick-detail__scroll' : ''}
            >
                {children}
            </div>
        </div>
    )
}


export default PickDetail
