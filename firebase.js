// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getstorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-a61fc.firebaseapp.com",
  projectId: "twitter-a61fc",
  storageBucket: "twitter-a61fc.appspot.com",
  messagingSenderId: "408455890860",
  appId: "1:408455890860:web:0fdf04824b863926261c09"
};

// Initialize Firebase
const app = !getApps().length?initializeApp(firebaseConfig):getApp();
const db = getFirestore();
const storage = getStorage();

export {app,db,storage};
