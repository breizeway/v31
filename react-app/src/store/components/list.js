const SET_RENDERED = 'List/setRendered'
const ACITVATE_EDIT_MODE = 'List/activateEditMode'
const DEACITVATE_EDIT_MODE = 'List/deactivateEditMode'
const SET_TITLE = 'List/setTitle'
const SET_EDITORITAL = 'List/setEditorial'

export const setRendered = listId  => {
    return {
        type: SET_RENDERED,
        listId,
    }
}

export const activateEditMode = listId  => {
    return {
        type: ACITVATE_EDIT_MODE,
        listId,
    }
}

export const deactivateEditMode = listId  => {
    return {
        type: DEACITVATE_EDIT_MODE,
        listId,
    }
}

export const setTitle = (listId, title)  => {
    return {
        type: SET_TITLE,
        listId,
        title,
    }
}

export const setEditorial = (listId, editorial)  => {
    return {
        type: SET_EDITORITAL,
        listId,
        editorial,
    }
}

const defaultState = {
    rendered: new Set(),
    editMode: new Set(),
    title: {},
    editorial: {},
}

const listReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case SET_RENDERED:
            newState = {...state}
            newState.rendered.add(action.listId)
            return newState
        case ACITVATE_EDIT_MODE:
            newState = {...state}
            newState.editMode.add(action.listId)
            return newState
        case DEACITVATE_EDIT_MODE:
            newState = {...state}
            newState.editMode.delete(action.listId)
            return newState
        case SET_TITLE:
            newState = {...state}
            newState.title[action.listId] = action.title
            return newState
        case SET_EDITORITAL:
            newState = {...state}
            newState.editorial[action.listId] = action.editorial
            return newState
        default:
            return state;
    }
}


export default listReducer
