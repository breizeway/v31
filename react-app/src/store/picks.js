import * as listActions from './lists'

const ADD_PICKS = 'lists/addPicks'
const STAGE_PICK = 'lists/stagePick'

export const addPicks = picks => {
    return {
        type: ADD_PICKS,
        picks
    }
}

export const stagePick = (pick) => {
    return {
        type: STAGE_PICK,
        pick
    }
}

export const runAddPicks = (pickIds) => async dispatch => {
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
            list_id: stagedPick.list_id,
            media_id: stagedPick.media_id,
            media_data: stagedPick.media_data,
            date: stagedPick.date_sort,
            editorial: stagedPick.editorial,
        })
    })
    const pick = await response.json()
    dispatch(addPicks([pick]))
    dispatch(listActions.setMediaPick(pick.list_id, pick.date_sort, pick))
    return pick
}

export const runDeletePicks = pickIds => async dispatch => {
    const response = await fetch(`/api/picks/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ids: pickIds})
    })
    const { picks } = await response.json()
    picks.forEach(pick => {
        dispatch(listActions.removePick(pick.list_id, pick.date_sort, pick.id))
    })
    return picks
}

const initialState = {
    all: {},
    staged: null,
}

const picksReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case ADD_PICKS:
            newState = {...state}
            action.picks.forEach(pick => {
                newState.all[pick.id] = pick
            })
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
