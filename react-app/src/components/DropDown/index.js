import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './DropDown.css'
import { removeActive } from '../../store/components/DropDown'

const DropDown = ({ options, justify }) => {
    const dispatch = useDispatch()

    const dropDownVisible = {
        val: useSelector(state => state.components.DropDown.active),
        rmv: () => dispatch(removeActive(dropDownVisible.val)),
    }

    const alignment = (() => {
        if (justify === 'right') return {right: '0'}
        return {left: '0'}
    })()

    const root = document.getElementById('root')
    const removeListener = () => root.removeEventListener('click', closeDropDown)
    const closeDropDown = () => dropDownVisible.rmv()
    useEffect(() => {
        root.addEventListener('click', closeDropDown)
        return () => removeListener()
    }, [removeListener, closeDropDown, root])

    return dropDownVisible.val && (
        <div className='dropdown'>
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
        </div>
    )
}


export default DropDown
