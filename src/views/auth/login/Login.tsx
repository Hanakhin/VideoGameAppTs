import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { SWEP, SWG } from "../../../../server/firebase/auth.ts";
import { useAuth } from "../../../contexts/authContext.tsx";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await SWEP(email, password);
                navigate('/');
            } catch (error) {
                setErrorMessage((error as Error).message);
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await SWG();
                navigate('/')
            } catch (error) {
                setErrorMessage((error as Error).message);
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Connexion
                </h2>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-xl sm:px-10">
                    {errorMessage && <p className="text-red-400 text-sm mb-4">{errorMessage}</p>}
                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSigningIn}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                            >
                                {isSigningIn ? 'Connexion...' : 'Se connecter'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <button
                            onClick={onGoogleSignIn}
                            disabled={isSigningIn}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                        >
                            Se connecter avec Google
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-400">
                            Pas encore inscrit ?{' '}
                            <Link to={'/register'} className="font-medium text-blue-400 hover:text-blue-300">
                                Créer un compte
                            </Link>
                        </p>
                        <Link to="/" className="font-medium text-blue-400 hover:text-blue-300">
                            Retour
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;