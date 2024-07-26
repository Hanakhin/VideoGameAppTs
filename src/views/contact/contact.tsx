import React, { useRef, useState, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import {Link} from "react-router-dom";

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
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Contactez-nous
                </h2>
                {error && <p className="text-red-600 text-sm mb-4">Il y'a eu une erreur lors de l'envoi</p>}
                {success && <p className="text-green-500 text-sm mb-4">Email envoyé</p>}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form  className="space-y-6" ref={form} onSubmit={sendEmail} method={"GET"}>
                        <div>
                            <label htmlFor="from_name" className="block text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <div className="mt-1">
                                <input
                                    id="from_name"
                                    name="from_name"
                                    type="text"
                                    required
                                    className="input"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">
                                Votre email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="user_email"
                                    name="user_email"
                                    type="email"
                                    required
                                    className="input"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    className="input"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Envoyer
                            </button>
                            <Link to="/" className="text-indigo-600 hover:text-indigo-700">
                                Retour
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;