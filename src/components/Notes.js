import React, {useContext} from "react";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {EmptyNotes} from "./EmptyNotes";
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const Notes = ({notes}) => {

    const alert = useContext(AlertContext)
    const fireBase = useContext(FirebaseContext)

    const handleToggleStatusNote = id => {
        fireBase.toggleStatusNote(id).then(() => {
            alert.show('Note status was successfully updated', 'success')
            setTimeout(alert.hide, 10000)
        }).catch(() => {
            alert.show('Something wrong', 'danger')
        })
    }

    const handleRemoveNote = id => {
        fireBase.removeNote(id).then(() => {
            alert.show('To do item was delete', 'success')
            setTimeout(alert.hide, 3000)
            }
        )

    }

    if(notes.length <= 0) {
        return <EmptyNotes />
    } else return (
        <>
            <TransitionGroup component='ul' className="list-group mt-2 w-75 m-0 m-auto">
                {notes.map(note => (
                    <CSSTransition
                        key={note.id}
                        classNames={'note'}
                        timeout={800}
                    >
                        <li className="list-group-item note">
                            <div className='d-flex'>
                                <div className="form-check form-switch mx-3">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"
                                           checked={note.completed}
                                           onChange={() => {handleToggleStatusNote(note.id)}}
                                    />
                                </div>
                                <small>{note.date}</small>
                                <strong className={note.completed ? 'text-decoration-line-through ms-3' : 'ms-3'}> {note.title} </strong>
                            </div>
                            <div className='d-flex'>
                                <div className='me-5'
                                     onClick={() => {
                                         fireBase.setEditNote(note.id)
                                         fireBase.handleToggleModal()
                                     }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd"
                                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </div>
                                <div onClick={() => {handleRemoveNote(note.id)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black"
                                         className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </div>
                            </div>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </>
    )

}

