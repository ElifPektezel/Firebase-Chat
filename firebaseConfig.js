import { initializeApp } from "firebase/app";

import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFirestore, collection} from 'firebase/firestore'


// 1. create new project on firebase console
// 2. enable email and password auth provider in authentication
// 3. create a web app and copy the firebseConfigs below 

const firebaseConfig = {
  apiKey: "AIzaSyCgLXrWckwPPsJ8Jc-tfZbk21ZPIKdM3uc",
  authDomain: "fir-chat-21faa.firebaseapp.com",
  projectId: "fir-chat-21faa",
  storageBucket: "fir-chat-21faa.appspot.com",
  messagingSenderId: "930941731802",
  appId: "1:930941731802:web:2f39f803cc5fa1382d76e3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
