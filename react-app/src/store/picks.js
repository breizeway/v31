const ADD_PICKS = 'lists/addPicks'
const ADD_PICKS_MEDIA = 'lists/addPicksMedia'
const STAGE_PICK = 'lists/stagePick'

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

export const stagePick = pick => {
    return {
        type: STAGE_PICK,
        pick
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

export const runStagePick = (mediaData, description, listId, date) => async dispatch => {
    const response = await fetch(`/api/picks/stage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            media_data: mediaData,
            description,
            list_id: listId,
            date: date.toUTCString().slice(0, 16) + ' 00:00:00 GMT'
        }),
    })
    const { pick } = await response.json()
    dispatch(stagePick(pick))
}

const initialState = {
    all: {},
    allMedia: {},
    staged: null,
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
        case STAGE_PICK:
            newState = {...state}
            newState.staged = action.pick
            return newState
        default:
            return state
    }
}


export default picksReducer
