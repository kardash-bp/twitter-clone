// Import the functions you need from the SDKs you need

import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain: "twitter-v1-a3aec.firebaseapp.com",

  projectId: "twitter-v1-a3aec",

  storageBucket: "twitter-v1-a3aec.appspot.com",

  messagingSenderId: "567114051462",

  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

  measurementId: "G-XWDZVXJC73"

};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const storage = getStorage()

export { app, db, storage, ref }