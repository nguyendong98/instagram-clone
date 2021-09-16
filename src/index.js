import 'wdyr';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from 'context/firebase';
import { authService, FieldValue, firebaseInstance } from 'lib/firebase';
import 'styles/app.css';

ReactDOM.render(
    <FirebaseContext.Provider value={{ authService, FieldValue, firebaseInstance }}>
        <App />
    </FirebaseContext.Provider>
    , document.getElementById('root')
);


