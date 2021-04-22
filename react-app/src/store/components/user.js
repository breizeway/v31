const SET_RENDERED = 'User/setRendered'

export const setRendered = username  => {
    return {
        type: SET_RENDERED,
        username,
    }
}

const defaultState = {
    rendered: new Set(),
}

const userReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case SET_RENDERED:
            newState = {...state}
            newState.rendered.add(action.username)
            return newState
        default:
            return state;
    }
}


export default userReducer
