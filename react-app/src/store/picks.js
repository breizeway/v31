const ADD_PICKS = 'lists/addPicks'
const ADD_PICKS_MEDIA = 'lists/addPicksMedia'

export const addPicks = picks => {
    return {
        type: ADD_PICKS,
        picks
    }
}

export const addPicksMedia = picks => {
    return {
        type: ADD_PICKS_MEDIA,
        picks
    }
}

export const runAddPicks = (pickIds, addMedia=false) => async dispatch => {
    if (addMedia) dispatch(runAddPicksMedia(pickIds))
    const response = await fetch(`/api/picks/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ids: pickIds,
            media: false,
        }),
    })
    const { picks } = await response.json()
    dispatch(addPicks(picks))
}

export const runAddPicksMedia = pickIds => async dispatch => {
    const response = await fetch(`/api/picks/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ids: pickIds,
            media: true,
        }),
    })
    const { picks_media } = await response.json()
    dispatch(addPicksMedia(picks_media))
}

const initialState = {
    all: {},
    allMedia: {},
}

const picksReducer = (state = initialState, action) => {
    let newState
    let all
    switch (action.type) {
        case ADD_PICKS:
            newState = {...state}
            all = {...state.all}
            action.picks.forEach(pick => {
                all[pick.id] = pick
            })
            newState.all = all
            return newState
        case ADD_PICKS_MEDIA:
            newState = {...state}
            all = {...state.all}
            action.picks.forEach(picks => {
                all[picks.id] = picks
            })
            newState.allMedia = all
            return newState
        default:
            return state
    }
}


export default picksReducer
