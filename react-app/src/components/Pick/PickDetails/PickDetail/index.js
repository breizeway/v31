import React from 'react'

import './PickDetail.css'


const PickDetail = ({ label, children }) => {
    return (
        <div className='pick-detail'>
            <div className='text-explanation-small'>{label}</div>
            {children}
        </div>
    )
}


export default PickDetail
