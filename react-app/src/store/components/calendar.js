const SET_VIEW = 'Calendar/setView'

export const setView = view => {
    return {
        type: SET_VIEW ,
        view,
    }
}

const initialState = {
    view: 'month',
}

const calendarReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_VIEW:
            newState = {...state}
            return newState
        default:
            return state;
    }
}


export default calendarReducer
