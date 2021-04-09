import * as dateActions from '../../services/dates'

const SET_VIEW_OPTIONS = 'Calendar/setViewOptions'
const SET_VIEW = 'Calendar/setView'
const SET_VIEW_START = 'Calendar/setViewStart'
const SET_DAYS = 'Calendar/setDays'

export const setViewOptions = () => {
    return {
        type: SET_VIEW_OPTIONS
    }
}

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

export const setDays = (listId) => {
    return {
        type: SET_DAYS,
        listId
    }
}

const defaultState = {
    rendered: new Set(),
    view: {
        default: 'month'
    },
    viewStart: {},
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
        case SET_VIEW_OPTIONS:
            newState = {...state}
            newState.viewOptions = defaultState.viewOptions
            return newState
        case SET_VIEW:
            newState = {...state}
            newState.rendered.add(action.listId)
            newState.view[action.listId] = action.data
            return newState
        case SET_VIEW_START:
            newState = {...state}
            newState.viewStart[action.listId] = action.data
            return newState
        case SET_DAYS:
            newState = {...state}
            const listId = action.listId
            const arg1 = newState.viewStart[listId]
            const arg2 = newState.viewOptions[newState.view[listId]].days
            const arg3 = newState.viewOptions[newState.view[listId]].id
            const days = dateActions.makeDays(arg1, arg2, arg3)
            console.log('   :::DAYSREDUCCCER:::   ', days);
            newState.days[listId] = []
            console.log('   :::NEWSTATE.DAYS[LISTID]:::   ', newState.days[listId]);
            newState.days[listId] = days
            return newState
        default:
            return state;
    }
}


export default calendarReducer
