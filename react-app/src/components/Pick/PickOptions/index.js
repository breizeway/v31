import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as pickDataActions from '../../../store/picks'
import * as pickActions from '../../../store/components/pick'
import { setActive } from '../../../store/components/dropDown'
import DropDown from '../../DropDown'
import ButtonGroup from '../../buttons/ButtonGroup'
import IconButton from '../../buttons/IconButton'

import './PickOptions.css'


const PickOptions = ({ listId, pickId }) => {
    const dispatch = useDispatch()

    const editMode = {
        val: useSelector(state => state.components.Pick.editMode.has(pickId)),
        set: () => dispatch(pickActions.activateEditMode(pickId)),
        rmv: () => dispatch(pickActions.deactivateEditMode(pickId)),
    }

    const pick = useSelector(state => state.lists.all[listId].picks[pickId])
    const chosenPick = useSelector(state => state.components.Pick.chosen[pickId])


    const list = useSelector(state => state.lists.all[listId])
    const user = useSelector(state => state.session.user)
    const owned = list?.host.id === user?.id

    const dropDown = {
        thisVal: `Pick/${pickId}/edit`,
        val: useSelector(state => state.components.DropDown.active),
        set: () => dispatch(setActive(dropDown.thisVal)),
        options: [
            {content: 'Edit', click: () => editMode.set()},
            {content: 'Delete', click: () => deletePick()},
        ]
    }

    const editorial = useSelector(state => state.components.Pick.editorial[pickId])

    const deletePick = () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this pick?\nThis action cannot be reversed.'
        )
        if (!confirmed) return
        dispatch(pickDataActions.runDeletePicks([pickId]))
    }

    const savePick = () => {
        const pickWithEditorial = {...pick}
        pickWithEditorial.editorial = editorial

        const chosenWithEditorial = {...chosenPick}
        chosenWithEditorial.editorial = editorial
        dispatch(pickDataActions.runCommitPick(chosenWithEditorial || pickWithEditorial))
        editMode.rmv()
    }

    return (
        <div className='pick-options'>
            {owned && (
                editMode.val ? (
                    <ButtonGroup flexDirection='column'>
                        <IconButton content='fas fa-times' action={() => editMode.rmv()}/>
                        <IconButton content='fas fa-check' action={() => savePick()}/>
                    </ButtonGroup>
                ) : (
                    <div>
                        <IconButton content='fas fa-ellipsis-h' action={() => dropDown.set()}/>
                        {dropDown.val === dropDown.thisVal && (
                            <DropDown options={dropDown.options} justify='right'/>
                        )}
                    </div>
                )
            )}
        </div>
    )
}


export default PickOptions
