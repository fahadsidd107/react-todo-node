import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBRhOpbsn5zrIgIfhZSywYuFgZRHirt6rA",
  authDomain: "weatherapp-efd8c.firebaseapp.com",
  projectId: "weatherapp-efd8c",
  storageBucket: "weatherapp-efd8c.appspot.com",
  messagingSenderId: "209376326269",
  appId: "1:209376326269:web:9ea87d324d78d7aea33714"
  };
initializeApp(firebaseConfig)

export const db = getFirestore();