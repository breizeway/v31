const SET_RENDERED = 'Pick/setRendered'
const ACITVATE_EDIT_MODE = 'Pick/activateEditMode'
const DEACITVATE_EDIT_MODE = 'Pick/deactivateEditMode'
const SET_TITLE = 'Pick/setTitle'
const SET_EDITORITAL = 'Pick/setEditorial'

export const setRendered = pickId  => {
    return {
        type: SET_RENDERED,
        pickId,
    }
}

export const activateEditMode = pickId  => {
    return {
        type: ACITVATE_EDIT_MODE,
        pickId,
    }
}

export const deactivateEditMode = pickId  => {
    return {
        type: DEACITVATE_EDIT_MODE,
        pickId,
    }
}

export const setTitle = (pickId, title)  => {
    return {
        type: SET_TITLE,
        pickId,
        title,
    }
}

export const setEditorial = (pickId, editorial)  => {
    return {
        type: SET_EDITORITAL,
        pickId,
        editorial,
    }
}

const defaultState = {
    rendered: new Set(),
    editMode: new Set(),
    title: {},
    editorial: {},
}

const pickReducer = (state = defaultState, action) => {
    let newState
    switch (action.type) {
        case SET_RENDERED:
            newState = {...state}
            newState.rendered.add(action.pickId)
            return newState
        case ACITVATE_EDIT_MODE:
            newState = {...state}
            newState.editMode.add(action.pickId)
            return newState
        case DEACITVATE_EDIT_MODE:
            newState = {...state}
            newState.editMode.delete(action.pickId)
            return newState
        case SET_TITLE:
            newState = {...state}
            newState.title[action.pickId] = action.title
            return newState
        case SET_EDITORITAL:
            newState = {...state}
            newState.editorial[action.pickId] = action.editorial
            return newState
        default:
            return state;
    }
}


export default pickReducer
