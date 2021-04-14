import React from 'react'

import './ViewBar.css'


const ViewBar = ({ views}) => {
    return (
        <div className='view-bar'>
            {views.map(view => (
                <div className='view-bar__view'>
                    {view}
                </div>
            ))}
        </div>
    )
}


export default ViewBar
