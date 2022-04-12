import React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AlertState} from "./context/alert/AlertState";
import {FirebaseState} from "./context/firebase/FirebaseState";

const root = createRoot( document.getElementById('root'))

root.render(
    <FirebaseState>
        <AlertState>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AlertState>
    </FirebaseState>,
  );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

