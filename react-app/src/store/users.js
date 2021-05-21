import * as sessionActions from './session'

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

export const runFollow = (sessionUserId, followUserId, following, sessionUsername) => async dispatch => {
    const response = await fetch(`/api/users/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            session_user_id: sessionUserId,
            follow_user_id: followUserId,
            following,
        }),
    })
    if (response.ok) {
        const follow = await response.json();
        dispatch(sessionActions.restore())
        return follow
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
