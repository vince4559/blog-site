import { initializeApp } from "firebase/app";
import { getAuth  } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAsiGoNGewo_pfP3Q6LXNg7giAhq5MABKU",
    authDomain: "blog-f72d2.firebaseapp.com",
    projectId: "blog-f72d2",
    storageBucket: "blog-f72d2.appspot.com",
    messagingSenderId: "530684988452",
    appId: "1:530684988452:web:8e76c4f9d5fc290e14dcb1"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

// //authentication setup
export const auth = getAuth(fireBaseApp);

// database setup
export const db = getFirestore(fireBaseApp)

// storage setup
export const storage  = getStorage(fireBaseApp) 