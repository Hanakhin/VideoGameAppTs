import React, { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext.tsx";
import { auth } from "../../../server/firebase/firebaseConfig.ts";

const Nav: React.FC = () => {
    const { userLogged, currentUser } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogOut = () => {
        return auth.signOut();
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                    <div className="relative flex items-center space-x-4">
                        {userLogged ? (
                            <div ref={dropdownRef} className="relative">
                                <span className="text-gray-300 cursor-pointer flex items-center" onClick={toggleDropdown}>
                                    Welcome <span className="text-blue-400 ml-1">{currentUser?.email}</span>
                                    <svg className={`w-4 h-4 ml-2 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </span>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 transition-opacity duration-300 opacity-100">
                                        <button
                                            onClick={handleLogOut}
                                            className="block w-full text-left px-4 py-2 text-red-700 "
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
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
