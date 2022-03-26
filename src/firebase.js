
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAaA3PETJph5xYOXrOUozJ2lB_Jnf49xBw",
    authDomain: "seamly-8b520.firebaseapp.com",
    projectId: "seamly-8b520",
    storageBucket: "seamly-8b520.appspot.com",
    messagingSenderId: "20658402284",
    appId: "1:20658402284:web:879a73f1f34981be69c6c9",
    measurementId: "G-WVL2YP6VDP"
  };


 const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app);
 
