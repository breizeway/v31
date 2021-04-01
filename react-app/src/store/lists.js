const SET_NEXT = "lists/setNext"

const setNext = lists => {
    return {
        type: SET_NEXT,
        lists
    }
}

export const addNext = num => async dispatch => {
    const response = await fetch(`/api/lists/next/${num}`, {
        headers: {
          'Content-Type': 'application/json',
        }
    })
    const { lists } = await response.json()
    dispatch(setNext(lists))
    return lists
}

const initialState = {
    next: null
}

const listReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_NEXT:
            newState = {...state}
            newState.next = action.lists
            return newState
        default:
            return state;
    }
}


export default listReducer
