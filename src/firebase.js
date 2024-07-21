// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArFl3nquQT3u0zNjFeEbGixiA6xct19iY",
    authDomain: "artist-awards.firebaseapp.com",
    projectId: "artist-awards",
    storageBucket: "artist-awards.appspot.com",
    messagingSenderId: "939895327812",
    appId: "1:939895327812:web:5426fc88edd7c11b028011",
    measurementId: "G-6QZ7VSL0GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);