import React, {useContext, useEffect} from 'react'
import {Notes} from "../components/Notes";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import {Loader} from "../components/Loader";
import routes from "../constants/contsRoutes";


const CompletedNotes = () => {
    const {loading, notes, fetchNotes} = useContext(FirebaseContext)

    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, [])

    const completedNotes = notes.filter(note => note.completed === true)
    return (
        <>
            {loading
                ? <Loader />
                : <> <h3 className='text-center my-5'> {routes.completedNotes.name}</h3>
                    <Notes notes={completedNotes}/>
                    </>
            }
        </>
    )
}

export default CompletedNotes;