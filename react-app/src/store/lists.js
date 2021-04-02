const ADD_LISTS = 'lists/addLists'
const ADD_LISTS_MEDIA = 'lists/addListsMedia'
const SET_NEXT = 'lists/setNext'
const NEW_LIST = 'lists/new'

const addLists = lists => {
    return {
        type: ADD_LISTS,
        lists
    }
}

const addListsMedia = lists => {
    return {
        type: ADD_LISTS_MEDIA,
        lists
    }
}

const setNext = lists => {
    return {
        type: SET_NEXT,
        lists
    }
}

const newList = list => {
    return {
        type: NEW_LIST,
        list
    }
}

export const runSetNext = (num, addMovieData=false) => async dispatch => {
    const response = await fetch(`/api/lists/next/${num}`, {
        headers: {
          'Content-Type': 'application/json',
        }
    })
    const { lists } = await response.json()
    console.log('   :::LISTS:::   ', lists);

    let nextLists = {}
    lists.forEach(list => {
        nextLists[list.id] = list.picks.map(pick => pick.id)
    })

    dispatch(setNext(nextLists))
    dispatch(addLists(lists))

    if (addMovieData) await dispatch(runSetNextMedia(num))
}

export const runSetNextMedia = num => async dispatch => {
    const response = await fetch(`/api/lists/next/${num}/add`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const { lists } = await response.json()

    dispatch(addListsMedia(lists))
}

export const runNewList = (title, description, startDate, endDate) => async dispatch => {
    const response = await fetch(`/api/lists/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
            start_date: startDate,
            end_date: endDate,
        })
    })
    const list = await response.json()
    return list
    // dispatch(addLists([list]))
}

const initialState = {
    all: {},
    allMedia: {},
    next: {},
    nextMedia: {}
}

const listReducer = (state = initialState, action) => {
    let newState
    let all
    switch (action.type) {
        case ADD_LISTS:
            newState = {...state}
            all = {...state.all}
            action.lists.forEach(list => {
                all[list.id] = list
            })
            newState.all = all
            return newState
        case ADD_LISTS_MEDIA:
            newState = {...state}
            all = {...state.all}
            action.lists.forEach(list => {
                all[list.id] = list
            })
            newState.allMedia = all
            return newState
        case SET_NEXT:
            newState = {...state}
            newState.next = action.lists
            return newState
        default:
            return state
    }
}


export default listReducer
