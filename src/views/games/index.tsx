import Nav from "../../components/nav/Nav.tsx";
import { db } from '../../../server/firebase/firebaseConfig.ts';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import GameCard from '../../components/games/GameCard.tsx';

interface Game {
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
    type: string;
}

const GamePage: React.FC = () => {
    const [items, setItems] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'games'));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Game[];
            setItems(data);
        } catch (err) {
            setError('Failed to fetch data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleGameDelete = () => {
        fetchData(); // Recharge la liste des jeux après la suppression
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-400"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="text-center text-red-400 bg-gray-800 p-8 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-50">
                    <h2 className="text-2xl font-bold mb-4">Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <Nav />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Our Games Collection
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {items.map((item) => (
                        <GameCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            price={item.price}
                            type={item.type}
                            onDelete={handleGameDelete}
                        />
                    ))}
                </div>
                <div className="text-center mt-16">
                    <Link
                        to="/addgame"
                        className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105"
                    >
                        Add New Game
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GamePage;