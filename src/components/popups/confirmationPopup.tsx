import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-white">{title}</h2>
                <p className="mb-4 text-gray-300">{message}</p>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-300"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition duration-300"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
