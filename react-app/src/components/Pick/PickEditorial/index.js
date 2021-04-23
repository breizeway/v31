import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './PickEditorial.css'
import TextAreaField from '../../input/TextAreaField'
import * as pickActions from '../../../store/components/pick'


const PickEditorial = ({ listId, pickId}) => {
    const dispatch = useDispatch()

    const pick = useSelector(state => state.lists.all[listId].picks[pickId])
    const chosenPick = useSelector(state => state.components.Pick.chosen[pickId])
    const data = chosenPick || pick || null
    const hasData = data !== null

    const editMode = useSelector(state => state.components.Pick.editMode.has(pickId))
    const editorial = {
        val: useSelector(state => state.components.Pick.editorial[pickId]),
        set: (editorial) => dispatch(pickActions.setEditorial(pickId, editorial))
    }

    return (
        ((editMode && hasData) || data.editorial) && (
            <div>
                {editMode && hasData ? (
                    <>
                        <div className='text-explanation-small'>editorial</div>
                        <TextAreaField
                            height='auto'
                            val={editorial.val}
                            setVal={editorial.set}
                            placeholder=''
                        />
                    </>
                ) : (
                    data.editorial && (
                        <>
                            <div className='pick-editorial__editorial-host'>
                                {`${pick.parent_list.host.username}`} said...
                            </div>
                            <div className='pick-editorial__editorial-bubble pick__about-text'>{data.editorial}</div>
                        </>
                    )
                )}
            </div>)

    )
}


export default PickEditorial
