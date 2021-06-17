import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import './ListControlPanel.css'
import BooleanField from '../../../input/BooleanField'
import * as listActions from '../../../../store/components/list'


const ListControlPanel = () => {
    const dispatch = useDispatch()
    const { listId } = useParams()

    const published = {
        val: useSelector(state => state.components.List.published[listId]),
        set: (published) => dispatch(listActions.setPublished(listId, published)),
    }

    return (
        <div className='list-control-panel flex-column-sml'>
            <BooleanField
                label='Published'
                val={published.val}
                setVal={() => published.set(!published.val)}
            />
        </div>
    )
}


export default ListControlPanel
