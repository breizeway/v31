import React from 'react'

import './ListsRepeater.css'
import Lists from '../Lists'


const ListsRepeater = ({ dir }) => {
    return (
        <div className='lists-repeater'>
            {Object.keys(dir).map(key => (
                <Lists
                    listsKey={key}
                    listsTitle={dir[key]}
                    key={key}
                />
            ))}
        </div>
    )
}


export default ListsRepeater
