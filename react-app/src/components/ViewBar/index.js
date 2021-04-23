import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './ViewBar.css'
import * as viewBarActions from '../../store/components/viewBar'


const ViewBar = ({ views, viewBarName }) => {
    const dispatch = useDispatch()

    const rendered = {
        val: useSelector(state => state.components.ViewBar.rendered.has(viewBarName)),
        set: () => dispatch(viewBarActions.setRendered(viewBarName))
    }

    const viewIndex = {
        val: useSelector(state => state.components.ViewBar.view[viewBarName]),
        set: (index) => dispatch(viewBarActions.setView(viewBarName, index))
    }

    if (!rendered.val) {
        viewIndex.set(0)
        rendered.set()
    }

    return (
        <div className='view-bar space-col-big'>
            <div className='view-bar__bar header-3'>
                {views.map((view, i) => (
                    <div
                        key={i}
                        className='view-bar__header'
                        onClick={() => viewIndex.set(i)}
                        style={{
                            borderBottom: i === viewIndex.val ? '3px solid var(--color__theme-1)' : '3px solid #00000000',
                            // fontSize: i === viewIndex.val ? 'larger' : null,
                        }}
                    >
                        {view.header}
                    </div>
                ))}
            </div>
            <div className='view-bar__content' >
                {views.map((view, i) => viewIndex.val === i && (
                        <div
                            key={i}
                            className='view-bar__content'
                        >
                            {view.content}
                        </div>
                ))}
            </div>
        </div>
    )
}


export default ViewBar
