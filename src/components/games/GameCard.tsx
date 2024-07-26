import React, { useState } from 'react';
import { deleteGame } from "../../../server/firebase/firestore.ts";

interface GameCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
    type: string;
    onDelete: () => void;
}

const DEFAULT_IMAGE_URL = '/img/default.jpg';

const GameCard: React.FC<GameCardProps> = ({ id, title, description, image, price, type, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imgSrc, setImgSrc] = useState(image);

    const handleDelete = async () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le jeu "${title}" ?`)) {
            setIsDeleting(true);
            setError(null);
            try {
                await deleteGame(id);
                console.log('Game deleted successfully');
                onDelete();
            } catch (error) {
                console.error('Failed to delete game:', error);
                setError('Échec de la suppression du jeu. Veuillez réessayer.');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleImageError = () => {
        setImgSrc(DEFAULT_IMAGE_URL);
    };

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 m-4">
            <img
                className="w-full h-48 object-cover"
                src={imgSrc}
                alt={title}
                onError={handleImageError}
            />
            <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-blue-400">{title}</h3>
                <p className="text-gray-300 text-base mb-4">{description}</p>
                <p className="text-purple-400 font-bold text-xl mb-2">${price}</p>
                <p className="text-gray-400 text-sm mb-4">{type}</p>
                {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
                <button
                    className={`${
                        isDeleting ? 'bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                    } text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Suppression...' : 'Supprimer le jeu'}
                </button>
            </div>
        </div>
    );
};

export default GameCard;