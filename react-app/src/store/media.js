const SET_SEARCH_RESULTS = 'modal/setSearchResults'
const CLEAR_SEARCH_RESULTS = 'modal/clearSearchResults'
const SET_SEARCH_CHOICE= 'modal/setSearchChoice'

const setSearchResults = results => {
    return {
        type: SET_SEARCH_RESULTS,
        results
    }
}

export const clearSearchResults = () => {
    return {
        type: CLEAR_SEARCH_RESULTS
    }
}

const setSearchChoice = choice => {
    return {
        type: SET_SEARCH_CHOICE,
        choice
    }
}

export const runSetSearchResults = query => async dispatch => {
    const response = await fetch(`/api/media/search?query=${query}`)
    if (response.ok) {
        const { results } = await response.json();
        dispatch(setSearchResults(results))
    }
}

export const runSetSearchChoice = media_id => async dispatch => {
    const response = await fetch(`/api/media/${media_id}`)
    if (response.ok) {
        const result = await response.json();
        dispatch(setSearchChoice(result))
    }
}

const initialState = {
    searchResults: [],
    searchChoice: null,
}

const mediaReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_SEARCH_RESULTS:
            newState = {...state}
            newState.searchResults = action.results
            return newState
        case CLEAR_SEARCH_RESULTS:
            newState = {...state}
            newState.searchResults = []
            newState.searchChoice = null
            return newState
        case SET_SEARCH_CHOICE:
            newState = {...state}
            newState.searchChoice = action.choice
            return newState
        default:
            return state;
    }
}


export default mediaReducer
