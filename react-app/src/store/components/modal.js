const SET_ACTIVE = 'Modal/setActive'
const REMOVE_ACTIVE = 'Modal/removeActive'

export const setActive = modalName  => {
    return {
        type: SET_ACTIVE,
        modalName,
    }
}

export const removeActive = modalName  => {
    return {
        type: REMOVE_ACTIVE,
        modalName,
    }
}

const defaultState = {
    active: null
}

const modalReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case SET_ACTIVE:
            newState = {...state}
            if (!(newState.active && newState.active === action.modalName)) {
                newState.active = action.modalName
            }
            return newState
        case REMOVE_ACTIVE:
            newState = {...state}
            if (newState.active === action.modalName) {
                newState.active = null
            }
            return newState
        default:
            return state;
    }
}


export default modalReducer
