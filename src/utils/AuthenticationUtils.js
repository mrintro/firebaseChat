import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { AuthUserContext } from "./AuthUserProvider";

const validateEmail = (email) => {
    // validation logic.
    return true;
}

const validatePassword = (password) => {
    return true;
}

const firebaseConfig = {
    apiKey: "AIzaSyBijWtfQUbrybUVGr-LMSkH6_4IiVA8Rb0",
    authDomain: "fir-chat-fcd57.firebaseapp.com",
    projectId: "fir-chat-fcd57",
    storageBucket: "fir-chat-fcd57.appspot.com",
    messagingSenderId: "81653627865",
    appId: "1:81653627865:web:d740da11f6eb36ef2bf7c8",
    measurementId: "G-9M2VBSZWJK"
};

const onAuthStateChange = () => {

  return onAuthStateChanged(
        auth,
        async authUser => {
        }
    )
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storeDB = initializeFirestore(app, {experimentalForceLongPolling: true});

export {
    validateEmail,
    validatePassword,
    auth,
    storeDB,
    onAuthStateChange
}