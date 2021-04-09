const SET_VIEW = 'Calendar/setView'
const SET_VIEW_START = 'Calendar/setViewStart'

export const setView = (data, listId) => {
    return {
        type: SET_VIEW,
        listId,
        data
    }
}

export const setViewStart = (data, listId) => {
    return {
        type: SET_VIEW_START,
        listId,
        data
    }
}

const initialState = {
    view: {},
    viewStart: {},
}

const calendarReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_VIEW:
            newState = {...state}
            newState.view[action.listId] = action.data
            return newState
        case SET_VIEW_START:
            newState = {...state}
            newState.viewStart[action.listId] = action.data
            return newState
        default:
            return state;
    }
}


export default calendarReducer
