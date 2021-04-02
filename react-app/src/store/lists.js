const ADD_LISTS = 'lists/addLists'
const ADD_LISTS_MEDIA = 'lists/addListsMedia'
const SET_FRAME = 'lists/setFrame'

const addLists = lists => {
    return {
        type: ADD_LISTS,
        lists
    }
}

const addListsMedia = lists => {
    return {
        type: ADD_LISTS_MEDIA,
        lists
    }
}

const setFrame = (frameName, frame) => {
    return {
        type: SET_FRAME,
        payload: {frameName, frame}
    }
}

export const runAddLists = (listIds, addMedia=false) => async dispatch => {
    if (addMedia) dispatch(runAddListsMedia(listIds))
    const response = await fetch(`/api/lists/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ids: listIds,
            media: false,
        }),
    })
    const { lists } = await response.json()
    dispatch(addLists(lists))
}

export const runAddListsMedia = listIds => async dispatch => {
    const response = await fetch(`/api/lists/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ids: listIds,
            media: true,
        }),
    })
    const { lists_media } = await response.json()
    dispatch(addListsMedia(lists_media))
}

export const runSetFrame = (frameName, media=false, num=20) => async dispatch => {
    const response = await fetch(`/api/lists/${frameName}/${num}`, {
        headers: {
          'Content-Type': 'application/json',
        }
    })
    const frame = await response.json()
    dispatch(setFrame(frameName, frame))

    if (media) await dispatch(runAddLists(Object.keys(frame), true))
    else await dispatch(runAddLists(Object.keys(frame), false))
}

export const runNewList = (title, description, startDate, endDate) => async dispatch => {
    const response = await fetch(`/api/lists/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
            start_date: startDate,
            end_date: endDate,
        })
    })
    const list = await response.json()
    dispatch(addLists([list]))
    return list
}

const initialState = {
    all: {},
    allMedia: {},
    next: {},
    my: {},
}

const listReducer = (state = initialState, action) => {
    let newState
    let all
    switch (action.type) {
        case ADD_LISTS:
            newState = {...state}
            all = {...state.all}
            action.lists.forEach(list => {
                all[list.id] = list
            })
            newState.all = all
            return newState
        case ADD_LISTS_MEDIA:
            newState = {...state}
            all = {...state.all}
            action.lists.forEach(list => {
                all[list.id] = list
            })
            newState.allMedia = all
            return newState
        case SET_FRAME:
            newState = {...state}
            newState[action.payload.frameName] = action.payload.frame
            return newState
        default:
            return state
    }
}


export default listReducer
