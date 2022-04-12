import React, {useState, useContext} from "react";
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";


export const Form = () => {

    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)
    const firebase = useContext(FirebaseContext)

    const submitHandler = event => {
        event.preventDefault()
        if (value.trim()) {
            firebase.addNote(value.trim()).then(() => {
                alert.show('To do item was made', 'success')
                setTimeout(alert.hide, 10000)
            }).catch(() => {
                alert.show('Something wrong', 'danger')
            })
            setValue('')
        } else {
            alert.show ('Enter title for to do item')
            setTimeout(alert.hide, 10000)
        }

    }
    return (
        <form onSubmit={submitHandler} className='w-75 m-auto m-0 mt-4 d-flex justify-content-between'>
            <div className="form-group w-75">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Make new to do"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-dark">Send</button>
        </form>
    )
}
