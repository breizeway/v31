const ADD_PICKS = 'lists/addPicks'
const ADD_PICKS_MEDIA = 'lists/addPicksMedia'
const STAGE_PICK = 'lists/stagePick'
// const COMMIT_PICK = 'lists/commitPick'

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

// const commitPick = stagedPick => {
//     return {
//         type: COMMIT_PICK,
//         stagedPick
//     }
// }

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
    return pick
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
