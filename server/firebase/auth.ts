import {auth} from "./firebaseConfig";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,signOut,GoogleAuthProvider} from "@firebase/auth";

export const CUWEP = async(email:string,password:string)=>{
    return createUserWithEmailAndPassword(auth,email,password);
};

export const SWEP = (email:string,password:string)=>{
    return signInWithEmailAndPassword(auth,email,password);
}

export const SWG = async ()=>{
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth,provider);
}

export const SO=()=>{
    return signOut(auth);
}

