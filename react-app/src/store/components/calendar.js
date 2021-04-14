import Calendar from '../../services/calendar'

const CALENDAR_INITIALIZE = 'Calendar/calendarInitialize'
const CALENDAR_SET_VIEW = 'Calendar/calendarSetView'
const CALENDAR_RESET_VIEW = 'Calendar/calendarResetView'
const CALENDAR_GO_BACK = 'Calendar/calendarGoBack'
const CALENDAR_GO_FORWARD = 'Calendar/calendarGoForward'

export const calendarInitialize = (listId, date) => {
    return {
        type: CALENDAR_INITIALIZE,
        listId,
        date,
    }
}

export const calendarSetView = (listId, view) => {
    return {
        type: CALENDAR_SET_VIEW,
        listId,
        view
    }
}

export const calendarResetView = listId => {
    return {
        type: CALENDAR_RESET_VIEW,
        listId,
    }
}

export const calendarGoBack = listId => {
    return {
        type: CALENDAR_GO_BACK,
        listId,
    }
}

export const calendarGoForward = listId => {
    return {
        type: CALENDAR_GO_FORWARD,
        listId,
    }
}

const defaultState = {
    rendered: new Set(),
    calendar: {},
}

const calendarReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case CALENDAR_INITIALIZE:
            newState = {...state}
            newState.rendered.add(action.listId)
            newState.calendar[action.listId] = new Calendar(action.date)
            return newState
        case CALENDAR_SET_VIEW:
            newState = {...state}
            newState.calendar[action.listId].setView(action.view)
            return newState
        case CALENDAR_RESET_VIEW:
            newState = {...state}
            newState.calendar[action.listId].resetView()
            return newState
        case CALENDAR_GO_BACK:
            newState = {...state}
            newState.calendar[action.listId].goBack()
            return newState
        case CALENDAR_GO_FORWARD:
            newState = {...state}
            newState.calendar[action.listId].goForward()
            return newState
        default:
            return state;
    }
}


export default calendarReducer
