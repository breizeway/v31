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
    if (user.id) dispatch(setUser(user)) // only set the user state if the route doesn't return errors
    return user
}

export const login = (email, password) => async dispatch => {
    const user = await auth.login(email, password)
    if (user.id) dispatch(setUser(user)) // only set the user state if the route doesn't return errors
    return user
}

export const signup = (username, email, password) => async dispatch => {
    const user = await auth.signup(username, email, password)
    if (user.id) dispatch(setUser(user)) // only set the user state if the route doesn't return errors
    return user
}

export const logout = () => async dispatch => {
    const response = await auth.logout()
    dispatch(removeUser())
    return response
}

const initialState = {
    user: null
}

const sessionReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_USER:
            newState = {...state}
            newState.user = action.user
            return newState
        case REMOVE_USER:
            newState = {...state};
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer
