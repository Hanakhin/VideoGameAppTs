import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,signOut,GoogleAuthProvider} from "@firebase/auth";

export const CUWEP = async (email: string, password: string, role: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Créer un document utilisateur dans Firestore avec le rôle
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            role: role
        });

        return user;
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

