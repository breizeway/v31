import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './DropDown.css'
import { removeActive } from '../../store/components/dropDown'
import { parentsHaveClass } from '../../services/dom'

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

    useEffect(() => {
        const root = document.getElementById('root')
        const removeListener = () => root.removeEventListener('click', closeDropDown)
        const closeDropDown = e => {
            // check if any parent classes have the class that should prevent it from closing
            const shouldClose = !(parentsHaveClass(e.target, 'dropdown-prevent-close'))
            if (shouldClose) dropDownVisible.rmv()
        }

        root.addEventListener('click', closeDropDown)

        //
        // const rowsThatShouldPreventClose = document.querySelectorAll('.dropdown__panel-row')
        // rowsThatShouldPreventClose.forEach(row => {
        //     row.addEventListener('click', e => {
        //         console.log(e.target)
        //     })
        // })

        return () => removeListener()
    }, [dropDownVisible])

    return dropDownVisible.val && (
        <div className='dropdown'>
            <div className='dropdown__content subtle-shadow' style={alignment}>
                {options.map((option, i) => {
                    const type = (() => {
                        switch (option.type) {
                            case 'panel':
                                return 'dropdown__panel-row dropdown-prevent-close'
                            case 'divider':
                                return 'dropdown__divider-row'
                            default:
                                return 'dropdown__button-row'
                        }
                    })()

                    const click = () => {
                        option.click()
                    }

                    return (
                        <div
                            className={`dropdown__row ${type}`}
                            onClick={click}
                            key={i}
                        >
                            {option.content}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default DropDown
