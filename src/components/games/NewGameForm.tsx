import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
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
            console.log('Game added successfully!');
            // Reset form fields after successful submission
            setTitle('');
            setDescription('');
            setImage('');
            setPrice('');
            setType('');
            navigate('/games')
        } catch (error) {
            console.error('Error adding game:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Game</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700 resize-none">Description:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Image URL:</label>
                <input
                    type="url"
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Price:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-700">Type:</label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
                Add Game
            </button>
            <Link to="/games" className="text-indigo-600 hover:text-indigo-700">Retour</Link>
        </form>
    );
};

export default NewGame;