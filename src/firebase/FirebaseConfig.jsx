// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4Hu8icM5QdQ5-7cm2OV20rJh9Gw80oOo",
  authDomain: "pharmacy-f41dc.firebaseapp.com",
  projectId: "pharmacy-f41dc",
  storageBucket: "pharmacy-f41dc.appspot.com",
  messagingSenderId: "996498094710",
  appId: "1:996498094710:web:54df2582712ddd69627d57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const imgDB =getStorage(app);
const txtDB =getFirestore(app);

export { fireDB,imgDB,txtDB, auth }