import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";
import routes from '../constants/contsRoutes';
import Home from "../pages/Home";
import CompletedNotes from "../pages/CompletedNotes";
import {Navbar} from "../components/Navbar";
import {Alert} from "../components/Alert";
import {Page404} from "../pages/Page404";
import {Footer} from "../pages/Footer";
import {Modal} from "../components/Modal";
import {FirebaseContext} from "../context/firebase/firebaseContext";


export default function AppRoutes () {

    const firebase = useContext(FirebaseContext)

    return (
        <>
            <Navbar />
            <Alert />
            {firebase.isOpenModal && <Modal />}
            <Routes>
                <Route path={routes.home.href} element={<Home />}/>
                <Route exact path={routes.completedNotes.href} element={<CompletedNotes />}/>
                <Route path={'*'} element={<Page404 />}/>
            </Routes>
            <Footer />
        </>
        )
}