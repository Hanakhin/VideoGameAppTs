import {initializeApp} from 'firebase/app';
import {getFirestore,Firestore} from 'firebase/firestore'
import {getAuth} from "@firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const app:FirebaseApp = initializeApp(firebaseConfig);
const db:Firestore = getFirestore(app);
const auth:FirebaseAuth = getAuth(app);

export{db,auth,app}