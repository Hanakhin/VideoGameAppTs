import React, { useState } from 'react';
import { deleteGame } from "../../../server/firebase/firestore.ts";
import { Link } from 'react-router-dom';
import { useAuth } from "../../contexts/authContext.tsx";

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
    const { userRole } = useAuth(); // Récupérer le rôle de l'utilisateur connecté
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imgSrc, setImgSrc] = useState(image);

    const handleDelete = async () => {
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer le jeu "${title}" ?`)) {
            setIsDeleting(true);
            setError(null);
            try {
                await deleteGame(id);
                console.log('Jeu supprimé avec succès');
                onDelete();
            } catch (error) {
                console.error('Échec de la suppression du jeu :', error);
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
                <p className="text-gray-300 text-sm mb-4 h-12 overflow-hidden">{description}</p>
                <p className="text-purple-400 font-bold text-xl mb-2">${price}</p>
                <p className="text-gray-400 text-sm mb-4">{type}</p>
                {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

                {userRole === 'admin' && (
                    <div className="flex justify-between items-center">
                        <Link
                            to={`/edit-game/${id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                        >
                            Modifier
                        </Link>
                        <button
                            className={`${
                                isDeleting ? 'bg-gray-600' : 'bg-red-500 hover:bg-red-600'
                            } text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Suppression...' : 'Supprimer'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameCard;
