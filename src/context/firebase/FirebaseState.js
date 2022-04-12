import React, {useReducer} from "react";
import axios from "axios";
import {FirebaseContext} from "./firebaseContext";
import {firebaseReducer} from "./firebaseReducer";
import {ADD_NOTE, FETCH_NOTE, REMOVE_NOTE, SHOW_LOADER, TOGGLE_MODAL, SET_EDIT_NOTE, UPDATE_NOTE, UPDATE_STATUS_NODE} from "../../constants/constFirebase";

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false,
        isOpenModal: false,
        modalItem: {}
    }

    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => (
        dispatch({
            type: SHOW_LOADER,
        })
    )

    const handleToggleModal = () => {
        dispatch({
            type: TOGGLE_MODAL,
        })
    }

    const fetchNotes = async () => {
        showLoader()
        const res = await axios.get(`${url}/notes.json`)

        const payload = res.data ? Object.keys(res.data).map(key => {
            return {
                ...res.data[key],
                id: key
            }

        }) : []
        dispatch({
            type: FETCH_NOTE,
            payload: payload
        })
    }

    const addNote = async text => {
        const title = text.charAt(0).toUpperCase() + text.slice(1)
        const note = {
            title, date: new Date().toLocaleDateString(), completed: false
        }

        try {
            const res = await axios.post(`${url}/notes.json`, note)
            const payload = {
                ...note,
                id: res.data.name
            }

            dispatch({
                type: ADD_NOTE,
                payload: payload
            })

        } catch (e) {
            throw new Error(e.message)
        }
    }


    const removeNote = async id => {
        try {
            await axios.delete(`${url}/notes/${id}.json`)

            dispatch({
                type: REMOVE_NOTE,
                payload: id
            })

        } catch (e) {
            throw new Error(e.message)
        }
    }

    const updateNote = async text => {
        handleToggleModal()
        const title = text.charAt(0).toUpperCase() + text.slice(1)
        const note = {
            ...state.modalItem,
            title
        }

        const index = state.notes.findIndex(note => note.id === state.modalItem.id);
        const id = state.notes[index].id;

        try {
            await axios.put(`${url}/notes/${id}.json`, note)

            dispatch({
                type: UPDATE_NOTE,
                payload: note
            })

        } catch (e) {
            throw new Error(e.message)
        }
    }

    const setEditNote = id => {
        const index = state.notes.findIndex(note => note.id === id);
        const payload = state.notes[index]

        dispatch({
            type: SET_EDIT_NOTE,
            payload: payload
        })

    }

    const toggleStatusNote = async id => {

        const index = state.notes.findIndex(note => note.id === id);
        const idNote = state.notes[index].id;

        const note = {
            ...state.notes[index],
            completed: !state.notes[index].completed
        }
        try {
            await axios.put(`${url}/notes/${idNote}.json`, note)

            dispatch({
                type: UPDATE_STATUS_NODE,
                payload: note
            })

        } catch (e) {
            throw new Error(e.message)
        }
    }


    return (
        <FirebaseContext.Provider value={{
            showLoader, addNote, removeNote, fetchNotes,
            updateNote, handleToggleModal, setEditNote,
            toggleStatusNote,
            modalItem: state.modalItem,
            isOpenModal: state.isOpenModal,
            loading: state.loading,
            notes: state.notes,

        }}>
            {children}
        </FirebaseContext.Provider>
    )
}