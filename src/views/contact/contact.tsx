import React, { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import { Link } from "react-router-dom";
import Nav from "../../components/nav/Nav.tsx";

const Contact: React.FC = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.current) {
            emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            ).then(
                () => {
                    setSuccess(true);
                    setError(false);
                },
                (error) => {
                    setError(true);
                    setSuccess(false);
                    console.log(error);
                }
            );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <Nav />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-md mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Contactez-nous
                    </h2>
                    {error && <p className="text-red-400 text-sm mb-4 text-center">Il y a eu une erreur lors de l'envoi</p>}
                    {success && <p className="text-green-400 text-sm mb-4 text-center">Email envoyé avec succès</p>}

                    <form className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg" ref={form} onSubmit={sendEmail} method="GET">
                        <div>
                            <label htmlFor="from_name" className="block text-sm font-medium text-gray-300">
                                Nom
                            </label>
                            <input
                                id="from_name"
                                name="from_name"
                                type="text"
                                required
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="user_email" className="block text-sm font-medium text-gray-300">
                                Votre email
                            </label>
                            <input
                                id="user_email"
                                name="user_email"
                                type="email"
                                required
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                            >
                                Envoyer
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link to="/" className="text-blue-400 hover:text-blue-300 transition duration-300">
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;