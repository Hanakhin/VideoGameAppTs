import React, { useState, useEffect, FormEvent } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../server/firebase/firebaseConfig.ts';
import Nav from "../../components/nav/Nav.tsx";

interface GameData {
    title: string;
    description: string;
    price: number;
    type: string;
    image: string;
}

const EditGame: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [gameData, setGameData] = useState<GameData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const gameDocRef = doc(db, 'games', id);
                const gameDoc = await getDoc(gameDocRef);
                if (gameDoc.exists()) {
                    setGameData(gameDoc.data() as GameData);
                } else {
                    setError('Game not found');
                }
            } catch (error) {
                setError('Failed to fetch game data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGame();
    }, [id]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (gameData) {
            setIsUpdating(true);
            try {
                const gameDocRef = doc(db, 'games', id);
                await updateDoc(gameDocRef, gameData);
                navigate('/games');
            } catch (error) {
                setError('Failed to update game');
                console.error(error);
            } finally {
                setIsUpdating(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setGameData(prevData => prevData ? { ...prevData, [name]: value } : null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center text-red-600 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="from-gray-900 to-gray-800 min-h-screen">
            <Nav />
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-center text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Modifier le jeu
                </h2>
                <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                                Titre
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                value={gameData?.title || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                required
                                rows={4}
                                value={gameData?.description || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-300">
                                Prix
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                required
                                value={gameData?.price || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-300">
                                Type
                            </label>
                            <select
                                id="type"
                                name="type"
                                required
                                value={gameData?.type || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select a type</option>
                                <option value="action">Action</option>
                                <option value="adventure">Adventure</option>
                                <option value="rpg">RPG</option>
                                <option value="strategy">Strategy</option>
                                <option value="sports">Sports</option>
                                <option value="simulation">Simulation</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                                URL de l'image
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="text"
                                value={gameData?.image || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                            >
                                {isUpdating ? 'Mise à jour...' : 'Mettre à jour'}
                            </button>
                            <Link to={"/games"}>Retour</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditGame;