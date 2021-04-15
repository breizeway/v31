const SET_ACTIVE = 'DropDown/setActive'
const REMOVE_ACTIVE = 'DropDown/removeActive'

export const setActive = dropDownName  => {
    return {
        type: SET_ACTIVE,
        dropDownName,
    }
}

export const removeActive = dropDownName  => {
    return {
        type: REMOVE_ACTIVE,
        dropDownName,
    }
}

const defaultState = {
    active: null
}

const dropDownReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case SET_ACTIVE:
            newState = {...state}
            if (!(newState.active && newState.active === action.dropDownName)) {
                newState.active = action.dropDownName
            }
            return newState
        case REMOVE_ACTIVE:
            newState = {...state}
            if (newState.active === action.dropDownName) {
                newState.active = null
            }
            return newState
        default:
            return state;
    }
}


export default dropDownReducer
