import React, { useEffect, useState } from 'react';
import { db } from '../../../server/firebase/firebaseConfig';
import {collection, getDocs, doc, updateDoc} from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
    const { userRole } = useAuth(); // Récupérer le rôle de l'utilisateur connecté
    const [users, setUsers] = useState<any[]>([]); // État pour stocker les utilisateurs
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users');
            const userDocs = await getDocs(usersCollection);
            const userList = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
            setLoading(false);
        };

        fetchUsers();
    }, []);

    const handleRoleChange = async (userId: string, newRole: string) => {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, { role: newRole });
        // Mettre à jour l'état local pour refléter le changement
        setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    };

    if (userRole !== 'admin') {
        return <div
            className="text-red-500 text-center flex flex-col items-center justify-center h-screen w-screen">Accès refusé. Vous n'êtes pas autorisé à voir cette page.
            <Link to={'/'} className={'text-2xl text-gray-900 hover:text-red-700 '}>Retourner en lieu sur :/</Link>
        </div>; // Message d'accès refusé
    }

    return (
        <div className="min-h-screen p-6 bg-gray-900">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Panneau d'administration</h1>
            <div className="text-center mb-4">
                <Link to="/" className="text-blue-400 hover:text-blue-300">
                    Retour à la page d'accueil
                </Link>
            </div>
            {loading ? (
                <p className="text-white text-center">Chargement des utilisateurs...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 text-white rounded-lg shadow-lg">
                        <thead>
                        <tr className="bg-gray-700">
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Rôle</th>
                            <th className="py-3 px-4 text-left">Modifier le rôle</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-600 transition duration-200">
                                <td className="py-2 px-4 border-b border-gray-600">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-600">{user.role}</td>
                                <td className="py-2 px-4 border-b border-gray-600">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="bg-gray-700 border border-gray-600 rounded-md py-1 px-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="user">Utilisateur</option>
                                        <option value="admin">Administrateur</option>
                                        <option value="moderator">Modérateur</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
