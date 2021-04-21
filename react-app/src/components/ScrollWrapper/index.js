import React from 'react'

import './ScrollWrapper.css'


const ScrollWrapper = ({ children, moreClasses='' }) => {
    return (
        <div className={`scroll-wrapper ${moreClasses}`}>
            {children}
        </div>
    )
}


export default ScrollWrapper
