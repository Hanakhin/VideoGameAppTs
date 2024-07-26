import { db } from './firebaseConfig';
import { addDoc, deleteDoc, updateDoc, collection, doc } from "firebase/firestore";

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
        throw e;
    }
}

interface GameData {
    title?: string;
    description?: string;
    price?: number;
    type?: string;
    image?: string;
    // Ajoutez d'autres champs si nécessaire
}

export const updateGame = async (gameId: string, updatedData: GameData) => {
    try {
        const gameDocRef = doc(db, 'games', gameId);
        await updateDoc(gameDocRef, updatedData);
        console.log("Document successfully updated!");
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
}