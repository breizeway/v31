import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './DropDown.css'
import { setActive } from '../../store/components/DropDown'

const DropDown = ({ options, justify }) => {
    const dispatch = useDispatch()

    const dropDownVisible = {
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive())
    }

    const alignment = (() => {
        if (justify === 'right') return {right: '0'}
        return {left: '0'}
    })()


    return dropDownVisible.val && (
        <div className='dropdown' onClick={dropDownVisible.set}>
            <div className='dropdown__content' style={alignment}>
                {options.map((option, i) => (
                    <div
                        className='dropdown__content-row'
                        onClick={option.click}
                        key={i}
                    >
                        {option.content}
                    </div>
                ))}
            </div>
            <div className='dropdown__background' onClick={dropDownVisible.set}/>
        </div>
    )
}


export default DropDown
