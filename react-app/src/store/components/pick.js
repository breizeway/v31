const SET_RENDERED = 'Pick/setRendered'
const ACITVATE_EDIT_MODE = 'Pick/activateEditMode'
const DEACITVATE_EDIT_MODE = 'Pick/deactivateEditMode'
const SET_TITLE = 'Pick/setTitle'
const SET_EDITORITAL = 'Pick/setEditorial'
const SET_QUERY = 'Pick/setQuery'
const SET_SEARCH_RESULTS = 'Pick/setSearchResults'
const SET_CHOSEN = 'Pick/setChosen'

export const setRendered = pickId  => {
    return {
        type: SET_RENDERED,
        pickId,
    }
}

export const activateEditMode = pickId  => {
    return {
        type: ACITVATE_EDIT_MODE,
        pickId,
    }
}

export const deactivateEditMode = pickId  => {
    return {
        type: DEACITVATE_EDIT_MODE,
        pickId,
    }
}

export const setTitle = (pickId, title)  => {
    return {
        type: SET_TITLE,
        pickId,
        title,
    }
}

export const setEditorial = (pickId, editorial)  => {
    return {
        type: SET_EDITORITAL,
        pickId,
        editorial,
    }
}

export const setQuery = (pickId, query)  => {
    return {
        type: SET_QUERY,
        pickId,
        query,
    }
}

const setSearchResults = (pickId, results)  => {
    return {
        type: SET_SEARCH_RESULTS,
        pickId,
        results,
    }
}

export const runSetSearchResults = (pickId, query) => async dispatch => {
    const response = await fetch(`/api/media/search?query=${query}`)
    if (response.ok) {
        const { results } = await response.json();
        dispatch(setSearchResults(pickId, results))
    }
}

export const setChosen = (pickId, chosen)  => {
    return {
        type: SET_CHOSEN,
        pickId,
        chosen,
    }
}

export const runSetChosen = (pickId, listId, mediaId, dateSort, editorial='') => async dispatch => {
    const response = await fetch(`/api/picks/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            list_id: listId,
            media_id: mediaId,
            date: dateSort,
            editorial,
        }),
    })
    if (response.ok) {
        const chosen = await response.json();
        dispatch(setChosen(pickId, chosen))
        return chosen
    }
    return null
}

const defaultState = {
    rendered: new Set(),
    editMode: new Set(),
    title: {},
    editorial: {},
    query: {},
    searchResults: {},
    chosen: {},
}

const pickReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case SET_RENDERED:
            newState = {...state}
            newState.rendered.add(action.pickId)
            return newState
        case ACITVATE_EDIT_MODE:
            newState = {...state}
            newState.editMode.add(action.pickId)
            return newState
        case DEACITVATE_EDIT_MODE:
            newState = {...state}
            newState.editMode.delete(action.pickId)
            delete newState.chosen[action.pickId]
            return newState
        case SET_TITLE:
            newState = {...state}
            newState.title[action.pickId] = action.title
            return newState
        case SET_EDITORITAL:
            newState = {...state}
            newState.editorial[action.pickId] = action.editorial
            return newState
        case SET_QUERY:
            newState = {...state}
            newState.query[action.pickId] = action.query
            return newState
        case SET_SEARCH_RESULTS:
            newState = {...state}
            newState.searchResults[action.pickId] = action.results
            return newState
        case SET_CHOSEN:
            newState = {...state}
            newState.chosen[action.pickId] = action.chosen
            return newState
        default:
            return state;
    }
}


export default pickReducer
