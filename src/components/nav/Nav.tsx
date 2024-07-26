import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.tsx";
import { auth } from "../../../server/firebase/firebaseConfig.ts";

const Nav: React.FC = () => {
    const { userLogged, currentUser } = useAuth();

    const handleLogOut = () => {
        return auth.signOut();
    }

    return (
        <nav className="bg-gray-900 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            GameStore
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-300 hover:text-blue-400 transition duration-300">Home</Link>
                        <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition duration-300">Contact</Link>
                        <Link to="#" className="text-gray-300 hover:text-blue-400 transition duration-300">About</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {userLogged ? (
                            <>
                                <span className="text-gray-300">Welcome <span className="text-blue-400">{currentUser?.email}</span></span>
                                <button
                                    onClick={handleLogOut}
                                    className="text-red-400 hover:text-red-500 transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="text-gray-300 hover:text-blue-400 transition duration-300"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;