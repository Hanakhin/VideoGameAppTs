import { db } from './firebaseConfig'
import { addDoc, deleteDoc, updateDoc, collection, doc } from "firebase/firestore";
import {useNavigate} from "react-router-dom";


export const addGame = async (title: string, description: string, price: number, type: string, image: string) => {

    try {
        const docRef = await addDoc(collection(db, 'games'), {
            title,
            description,
            price,
            type,
            image
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
}

export const deleteGame = async (gameId: string) => {
    try {
        const gameDocRef = doc(db, 'games', gameId);
        await deleteDoc(gameDocRef);
        console.log("Document successfully deleted!");
    } catch (e) {
        console.error("Error deleting game: ", e);
    }
};

