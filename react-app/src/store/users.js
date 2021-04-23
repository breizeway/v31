const ADD_USER = 'users/addUser'

const addUser = user => {
    return {
        type: ADD_USER,
        user,
    }
}

export const runAddUserFromUsername = username => async dispatch => {
    const response = await fetch(`/api/users/by_username`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username
        }),
    })
    if (response.ok) {
        const user = await response.json();
        dispatch(addUser(user))
        return user
    }
}

const initialState = {
    byId: {},
    byUsername: {},
}

const usersReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case ADD_USER:
            newState = {...state}
            newState.byId[action.user.id] = action.user
            newState.byUsername[action.user.username] = action.user
            return newState
        default:
            return state;
    }
}


export default usersReducer
