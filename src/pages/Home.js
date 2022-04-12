import React, {useContext, useEffect} from 'react'
import {Form} from "../components/Form";
import {Notes} from "../components/Notes";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import {Loader} from "../components/Loader";


const Home = () => {
    const {loading, notes, fetchNotes} = useContext(FirebaseContext)

    useEffect(() => {
        fetchNotes()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Form />
            <hr className="w-75 m-auto m-0 mt-2"/>
            {loading ? <Loader /> : <Notes notes={notes}/>}
        </>
    )
}

export default Home;