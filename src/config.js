import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
    getFirestore
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB8UqKZIzxGrjnm_qtQAVKUgrD_uhtV7e0",
    authDomain: "is216-proj-v1.firebaseapp.com",
    projectId: "is216-proj-v1",
    storageBucket: "is216-proj-v1.appspot.com",
    messagingSenderId: "879909624473",
    appId: "1:879909624473:web:fb8d6a3801091ee323b608",
    measurementId: "G-5901NKNYBW"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);

export { firebaseApp, auth }