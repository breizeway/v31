const TOGGLE_VISIBILITY = 'modal/toggleVisibility'

export const toggleVisibility = () => {
    return {
        type: TOGGLE_VISIBILITY
    }
}

const initialState = {
    visible: false,
}

const modalReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case TOGGLE_VISIBILITY:
            newState = {...state}
            newState.visible = !newState.visible
            return newState
        default:
            return state;
    }
}


export default modalReducer
