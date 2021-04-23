import * as listActions from './lists'

const ADD_PICKS = 'picks/addPicks'

export const addPicks = picks => {
    return {
        type: ADD_PICKS,
        picks
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

export const runCommitPick = (stagedPick) => async dispatch => {
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
    console.log('   :::committed PICK:::   ', pick);
    dispatch(addPicks([pick]))
    dispatch(listActions.setMediaPick(pick))
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
        dispatch(listActions.removePick(pick))
    })
    return picks
}

const initialState = {
    all: {},
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
        default:
            return state
    }
}


export default picksReducer
