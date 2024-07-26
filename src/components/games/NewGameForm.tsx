import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addGame } from "../../../server/firebase/firestore.ts";

const NewGame: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await addGame(title, description, parseFloat(price), type, image);
            console.log('Jeu ajouté avec succès !');
            // Réinitialiser les champs du formulaire après une soumission réussie
            setTitle('');
            setDescription('');
            setImage('');
            setPrice('');
            setType('');
            navigate('/games');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du jeu :', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="max-w-lg w-full bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">Ajouter un Nouveau Jeu</h2>

                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-300">Titre :</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-300">Description :</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white resize-none"
                        rows={4}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-300">URL de l'image :</label>
                    <input
                        type="url"
                        id="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-300">Prix :</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                        step="0.01"
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-300">Type :</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                    >
                        <option value="">Sélectionner un type</option>
                        <option value="action">Action</option>
                        <option value="adventure">Aventure</option>
                        <option value="rpg">RPG</option>
                        <option value="strategy">Stratégie</option>
                        <option value="sports">Sports</option>
                        <option value="simulation">Simulation</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
                >
                    Ajouter le Jeu
                </button>
                <Link to="/games" className="block text-center mt-4 text-white hover:text-indigo-500">Retour</Link>
            </form>
        </div>
    );
};

export default NewGame;
