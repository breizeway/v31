const SET_RENDERED = 'ViewBar/setRendered'
const SET_ACTIVE = 'ViewBar/setView'
// const REMOVE_ACTIVE = 'ViewBar/removeActive'

export const setRendered = viewBarName  => {
    return {
        type: SET_RENDERED,
        viewBarName,
    }
}

export const setView = (viewBarName, index)  => {
    return {
        type: SET_ACTIVE,
        viewBarName,
        index,
    }
}

// export const removeActive = (viewBarName, viewName)  => {
//     return {
//         type: REMOVE_ACTIVE,
//         viewBarName,
//         viewName,
//     }
// }

const defaultState = {
    rendered: new Set(),
    view: {},
}

const viewBarReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case SET_RENDERED:
            newState = {...state}
            newState.rendered.add(action.viewBarName)
            return newState
        case SET_ACTIVE:
            newState = {...state}
            newState.view[action.viewBarName] = action.index
            return newState
        default:
            return state;
    }
}


export default viewBarReducer
