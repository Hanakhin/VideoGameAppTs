import React from 'react';
import { Link } from "react-router-dom";
import Nav from "../../components/nav/Nav.tsx";

const Homepage: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
            <Nav />
            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Bienvenue sur GameStore
                    </h1>
                    <p className="text-xl text-gray-300">Les meilleurs jeux aux meilleurs prix</p>
                </div>

                {/* Featured Games Carousel */}
                <div className="mb-16 bg-gray-800 rounded-2xl p-8 shadow-lg backdrop-blur-sm bg-opacity-50">
                    <h2 className="text-3xl font-bold mb-6 text-blue-400">Jeux en vedette</h2>
                    <div className="flex space-x-6 overflow-x-auto pb-4">
                        {/* Example game card */}
                        <div className="flex-shrink-0 w-56 bg-gray-700 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105">
                            <img src="/img/default.jpg" alt="Game" className="w-full h-72 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Nom du jeu</h3>
                                <p className="text-blue-400 font-bold">-50%</p>
                                <p className="text-gray-300">19.99€</p>
                            </div>
                        </div>
                        {/* Repeat for more games */}
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-blue-400">Catégories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['Action', 'Aventure', 'RPG', 'Stratégie'].map((category) => (
                            <button key={category} className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 transition duration-300 hover:shadow-lg hover:from-blue-600 hover:to-purple-700">
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Best Sellers */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-blue-400">Meilleures ventes</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Example best seller card */}
                        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                            <img src="/img/default.jpg" alt="Game" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Nom du jeu</h3>
                                <p className="text-blue-400 font-bold">-30%</p>
                                <p className="text-gray-300">29.99€</p>
                            </div>
                        </div>
                        {/* Repeat for more games */}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <Link to="/games" className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105">
                        Voir tous les jeux
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Homepage;