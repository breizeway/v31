const SET_REDIRECT = 'location/setRedirect'
const REMOVE_REDIRECT = 'location/removeRedirect'
const SET_CURRENT_PATH = 'location/setCurrentPath'

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

const setCurrentPath = path => {
    return {
        type: SET_CURRENT_PATH,
        path
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

export const addCurrentPath = path => async dispatch => {
    dispatch(setCurrentPath(path))
    return path
}

const initialState = {
    redirect: '/',
    currentPath: null
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
        case SET_CURRENT_PATH:
            newState = {...state}
            newState.currentPath = action.path
            return newState
        default:
            return state;
    }
}


export default locationReducer
