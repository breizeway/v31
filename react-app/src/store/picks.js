const ADD_PICKS = 'lists/addPicks'
const ADD_PICKS_MEDIA = 'lists/addPicksMedia'
const STAGE_PICK = 'lists/stagePick'
const UPDATE_EDITED_PICK = 'lists/updateEditedPick'

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

export const updateEditedPick = pick => {
    return {
        type: UPDATE_EDITED_PICK,
        edited: {date_sort: pick.date_sort, list_id: pick.list_id}
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

export const runStagePick = (mediaData, editorial, listId, date) => async dispatch => {
    const response = await fetch(`/api/picks/stage`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            media_data: mediaData,
            editorial,
            list_id: listId,
            date,
        }),
    })
    const { pick } = await response.json()
    dispatch(stagePick(pick))
    return pick
}

export const runCommitPick = stagedPick => async dispatch => {
    const response = await fetch(`/api/picks/commit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: stagedPick.title,
            editorial: stagedPick.editorial,
            original_poster: stagedPick.original_poster,
            date: stagedPick.date_sort,
            media_id: stagedPick.media_id,
            imdb_id: stagedPick.imdb_id,
            list_id: stagedPick.list_id,
        })
    })
    const pick = await response.json()
    dispatch(addPicks([pick]))
    dispatch(updateEditedPick(pick))
    return pick
}

export const runDeletePick = pickIds => async dispatch => {
    const response = await fetch(`/api/picks/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ids: pickIds})
    })
    const deleted = await response.json()
    return deleted
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
        case UPDATE_EDITED_PICK:
            newState = {...state}
            newState.editedPick = action.edited
            return newState
        default:
            return state
    }
}


export default picksReducer
