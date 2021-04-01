const SET_NEXT = 'lists/setNext'
const ADD_DATA = 'lists/addData'

const setNext = lists => {
    return {
        type: SET_NEXT,
        lists
    }
}

const addData = (slice, lists) => {
    return {
        type: ADD_DATA,
        payload: {slice, lists}
    }
}

export const addNext = (num, slice='next', addMovieData=false) => async dispatch => {
    const response = await fetch(`/api/lists/next/${num}`, {
        headers: {
          'Content-Type': 'application/json',
        }
    })
    const { lists } = await response.json()
    dispatch(setNext(lists))

    if (addMovieData) dispatch(addPickData(num, slice))

    return lists
}

export const addPickData = (num, slice) => async dispatch => {
    const response = await fetch(`/api/lists/next/${num}/add`, {
        headers: {
          'Content-Type': 'application/json',
        }
    })
    const { lists } = await response.json()
    dispatch(addData(slice, lists))
}

const initialState = {
    next: {}
}

const listReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_NEXT:
            newState = {...state}
            const lists = {}
            action.lists.forEach(list => {
                lists[list.id] = list
            })
            newState.next = lists
            return newState
        case ADD_DATA:
            newState = {...state}
            const addLists = {}
            action.payload.lists.forEach(list => {
                addLists[list.id] = list
            })
            newState[action.payload.slice] = addLists
            return newState
        default:
            return state
    }
}


export default listReducer
