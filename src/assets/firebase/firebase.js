// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlYHQA4lIq3A-PK9-mH3wLKu3D0BJk_w0",
  authDomain: "escrow-online-writers.firebaseapp.com",
  projectId: "escrow-online-writers",
  storageBucket: "escrow-online-writers.appspot.com",
  messagingSenderId: "407292178486",
  appId: "1:407292178486:web:b5eeeb2f7927f604656897",
  measurementId: "G-8Y619DJFW2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}

