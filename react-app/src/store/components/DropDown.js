const SET_ACTIVE = 'DropDown/setActive'

export const setActive = (dropDownName=null)  => {
    return {
        type: SET_ACTIVE,
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
            if (
                newState.active &&
                newState.active === action.dropDownName
            ) newState.active = null
            else newState.active = action.dropDownName
            return newState
        default:
            return state;
    }
}


export default dropDownReducer
