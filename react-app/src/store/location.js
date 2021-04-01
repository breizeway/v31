const SET_REDIRECT = "location/setRedirect"
const REMOVE_REDIRECT = "location/removeRedirect"

const setRedirect = path => {
    return {
        type: SET_REDIRECT,
        path
    }
}

const removeRedirect = () => {
    return {
        type: REMOVE_REDIRECT
    }
}

export const addRedirect = path => async dispatch => {
    dispatch(setRedirect(path))
    return path
}

export const resetRedirect = () => async dispatch => {
    dispatch(removeRedirect())
    return '/'
}

const initialState = {
    redirect: '/'
}

const locationReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_REDIRECT:
            newState = {...state}
            newState.redirect = action.path
            return newState
        case REMOVE_REDIRECT:
            return {...initialState}
        default:
            return state;
    }
}


export default locationReducer
