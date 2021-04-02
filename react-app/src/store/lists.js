const SET_NEXT = 'lists/setNext'
const SET_NEXT_MEDIA = 'lists/setNextMedia'
const ADD_DATA = 'lists/addData'

const setNext = lists => {
    return {
        type: SET_NEXT,
        lists
    }
}

const setNextMedia = lists => {
    return {
        type: SET_NEXT_MEDIA,
        lists
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

    if (addMovieData) dispatch(addNextMedia(num))

    return lists
}

export const addNextMedia = num => async dispatch => {
    const response = await fetch(`/api/lists/next/${num}/add`, {
        headers: {
          'Content-Type': 'application/json',
        }
    })
    const { lists } = await response.json()
    dispatch(setNextMedia(lists))
}

const initialState = {
    next: {},
    nextMedia: {}
}

const listReducer = (state = initialState, action) => {
    let newState
    let lists = {}
    switch (action.type) {
        case SET_NEXT:
            newState = {...state}
            action.lists.forEach(list => {
                lists[list.id] = list
            })
            newState.next = lists
            return newState
        case SET_NEXT_MEDIA:
            newState = {...state}
            action.lists.forEach(list => {
                lists[list.id] = list
            })
            newState.nextMedia = lists
            return newState
        default:
            return state
    }
}


export default listReducer
