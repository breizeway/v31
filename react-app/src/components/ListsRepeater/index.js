import React from 'react'

import './ListsRepeater.css'
import Lists from '../Lists'


const ListsRepeater = ({ dir }) => {
    return (
        <div className='lists-repeater'>
            {dir.map(listsInfo => (
                <Lists
                    key={listsInfo.listsType}
                    listsInfo={listsInfo}
                />
            ))}
        </div>
    )
}


export default ListsRepeater
