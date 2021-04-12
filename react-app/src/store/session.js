import * as auth from "../services/auth"


const SET_USER = "session/setUser"
const REMOVE_USER = "session/removeUser"

const setUser = user => {
    return {
        type: SET_USER,
        user
    }
}

const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

export const restore = () => async dispatch => {
    const user = await auth.authenticate()
    if (user.id) dispatch(setUser(user))
    return user
}

export const login = (username, password) => async dispatch => {
    const user = await auth.login(username, password)
    if (user.id) dispatch(setUser(user))
    return user
}

export const signup = (username, firstName, lastName, email, password) => async dispatch => {
    const user = await auth.signup(username, firstName, lastName, email, password)
    if (user.id) dispatch(setUser(user))
    return user
}

export const logout = () => async dispatch => {
    const response = await auth.logout()
    dispatch(removeUser())
    return response
}

const initialState = {
    user: null,
    loggedIn: false,
}

const sessionReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_USER:
            newState = {...state}
            newState.user = action.user
            newState.loggedIn = true
            return newState
            case REMOVE_USER:
            newState = {...state};
            newState.user = null;
            newState.loggedIn = false
            return newState;
        default:
            return state;
    }
}


export default sessionReducer
