const SET_SEARCH_RESULTS = 'modal/setSearchResults'
const CLEAR_SEARCH_RESULTS = 'modal/clearSearchResults'

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

export const runSetSearchResults = query => async dispatch => {
    const response = await fetch(`/api/media/search?query=${query}`)
    if (response.ok) {
        const { results } = await response.json();
        dispatch(setSearchResults(results))
    }
}

const initialState = {
    searchResults: [],
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
            return newState
        default:
            return state;
    }
}


export default mediaReducer
