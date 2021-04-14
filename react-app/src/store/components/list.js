const ACITVATE_EDIT_MODE = 'DropDown/activateEditMode'
const DEACITVATE_EDIT_MODE = 'DropDown/deactivateEditMode'

export const activateEditMode = listId  => {
    return {
        type: ACITVATE_EDIT_MODE,
        listId,
    }
}

export const deactivateEditMode = listId  => {
    return {
        type: DEACITVATE_EDIT_MODE,
        listId,
    }
}

const defaultState = {
    editMode: new Set(),
}

const listReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case ACITVATE_EDIT_MODE:
            newState = {...state}
            newState.editMode.add(action.listId)
            return newState
        case DEACITVATE_EDIT_MODE:
            newState = {...state}
            newState.editMode.delete(action.listId)
            return newState
        default:
            return state;
    }
}


export default listReducer
