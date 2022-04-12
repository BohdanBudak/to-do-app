import React, {useContext, useState} from "react";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import {AlertContext} from "../context/alert/alertContext";

export const Modal = () => {
    const firebase = useContext(FirebaseContext)
    const alert = useContext(AlertContext)
    const modalItem = firebase.modalItem.title;

    const [value, setValue] = useState(modalItem)

    const submitHandler = event => {
        event.preventDefault()
        if (value.trim()) {
            if(value.trim() === modalItem) {
                alert.show('Title the same! Please, enter new title!')
                setTimeout(alert.hide, 10000)
            } else {
                firebase.updateNote(value.trim()).then(() => {
                    alert.show('To do item was update', 'success')
                    setTimeout(alert.hide, 10000)
                }).catch(() => {
                    alert.show('Something wrong', 'danger')
                })
                setValue('')
            }
        } else {
                alert.show ('Enter title for to do item')
                setTimeout(alert.hide, 10000)
        }
    }

    const stopCloseModal = (e) => {
        e.stopPropagation()
    }

        return (
            <>
                <div className='modal container-fluid' onClick={firebase.handleToggleModal}>
                    <form onSubmit={submitHandler} onClick={stopCloseModal} className='modalContainer p-4'>
                        <div className='d-flex justify-content-center mb-4'>
                            <h3 className='me-3'>Edit your to do item!</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black"
                                 className="bi bi-pen" viewBox="0 0 16 16">
                                <path
                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                            </svg>
                        </div>
                        <div className=''>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control w-100"
                                    placeholder=""
                                    value={value}
                                    onChange={e => setValue(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center my-5'>
                            <h4 className='me-3'>Are you ready to update your to do item?</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                                 className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </svg>
                        </div>
                        <div className='d-flex justify-content-around mb-3'>
                            <div onClick={submitHandler}>
                                <svg type='button' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                     className="bi bi-check-square-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                                </svg>
                            </div>
                            <div onClick={firebase.handleToggleModal}>
                                <svg type='button' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                     className="bi bi-x-square-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
}
