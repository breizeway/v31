import * as dateActions from '../../services/dates'

const SET_VIEW = 'Calendar/setView'
const SET_VIEW_START = 'Calendar/setViewStart'
const SET_INITIAL_VIEW_START = 'Calendar/setInitialViewStart'
const SET_DAYS = 'Calendar/setDays'

export const setView = (listId, data) => {
    return {
        type: SET_VIEW,
        listId,
        data
    }
}

export const setViewStart = (listId, data) => {
    return {
        type: SET_VIEW_START,
        listId,
        data
    }
}

export const setInitialViewStart = (listId, data) => {
    return {
        type: SET_INITIAL_VIEW_START,
        listId,
        data
    }
}

export const setDays = (listId) => {
    return {
        type: SET_DAYS,
        listId
    }
}

export const runSetView = (listId, data) => async dispatch => {
    const view = dispatch(setView(listId, data))
    dispatch(setDays(listId))
    return view
}

export const runSetViewStart = (listId, data) => async dispatch => {
    const viewStart = dispatch(setViewStart(listId, data))
    dispatch(setDays(listId))
    return viewStart
}

const defaultState = {
    rendered: new Set(),
    view: {},
    viewStart: {},
    initialViewStart: {},
    viewOptions: {
        month: {id: 1, label: 'Month', days: 42},
        week: {id: 2, label: 'Week', days: 7},
        day: {id: 3, label: 'Day', days: 1},
    },
    days: {},
}

const calendarReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case SET_VIEW:
            newState = {...state}
            newState.rendered.add(action.listId)
            newState.view[action.listId] = action.data
            return newState
        case SET_VIEW_START:
            newState = {...state}
            newState.viewStart[action.listId] = action.data
            return newState
        case SET_INITIAL_VIEW_START:
            newState = {...state}
            newState.initialViewStart[action.listId] = action.data
            return newState
        case SET_DAYS:
            newState = {...state}
            const listId = action.listId
            const arg1 = newState.viewStart[listId]
            const arg2 = newState.viewOptions[newState.view[listId]].days
            const arg3 = newState.viewOptions[newState.view[listId]].id
            const days = dateActions.makeDays(arg1, arg2, arg3)
            newState.days[listId] = []
            newState.days[listId] = days
            return newState
        default:
            return state;
    }
}


export default calendarReducer
