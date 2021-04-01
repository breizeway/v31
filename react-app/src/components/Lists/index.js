import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './Lists.css'
import * as listActions from '../../store/lists'


const Lists = ({ type }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        switch (type) {
            case 'next':
                (async () => {
                    dispatch(listActions.addNext(20))
                })()
                break;
            default:
                break;
        }
    })
    const [numLists, setNumLists] = useState(20)


    return (
        <div className='lists'>
            Lists
        </div>
    )
}


export default Lists
