import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, getDoc, 
    updateDoc, doc, addDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyArFl3nquQT3u0zNjFeEbGixiA6xct19iY",
    authDomain: "artist-awards.firebaseapp.com",
    projectId: "artist-awards",
    storageBucket: "artist-awards.appspot.com",
    messagingSenderId: "939895327812",
    appId: "1:939895327812:web:5426fc88edd7c11b028011",
    measurementId: "G-6QZ7VSL0GK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app)

export {
    db,
    updateDoc,
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    setDoc,
    storage,
    ref,
    uploadBytes,
    getDownloadURL,
    auth
};