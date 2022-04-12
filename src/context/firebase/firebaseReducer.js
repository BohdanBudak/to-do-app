import {ADD_NOTE, FETCH_NOTE, REMOVE_NOTE, SET_EDIT_NOTE, SHOW_LOADER, TOGGLE_MODAL, UPDATE_NOTE, UPDATE_STATUS_NODE} from "../../constants/constFirebase";

const handlers = {
    [SHOW_LOADER]: (state) => ({
        ...state,
        loading: true
    }),
    [ADD_NOTE]: (state, {payload}) => ({
        ...state,
        notes: [...state.notes, payload],
    }),
    [FETCH_NOTE]: (state, {payload}) => ({
        ...state,
        notes: payload,
        loading: false
    }),
    [REMOVE_NOTE]: (state, {payload}) => ({
        ...state,
        notes: state.notes.filter(note => note.id !== payload)
    }),
    [TOGGLE_MODAL]: (state) => ({
        ...state,
        isOpenModal: !state.isOpenModal
    }),
    [UPDATE_NOTE]: (state, {payload}) => {
        const newState = state.notes.map(note => note.id === payload.id ? payload : note)
        return {
            ...state,
            modalItem: {},
            notes: newState
        }
    },
    [SET_EDIT_NOTE]: (state, {payload}) => ({
        ...state,
        modalItem: payload,
    }),
    [UPDATE_STATUS_NODE]: (state, {payload}) => {
        const newState = state.notes.map(note => note.id === payload.id ? payload : note)
        return {
            ...state,
            notes: newState
        }
    },
    DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}