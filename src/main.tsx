import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import { AuthProvider } from "./contexts/authContext.tsx";
import Login from "./views/auth/login/Login.tsx";
import Register from "./views/auth/register/Register.tsx";
import Contact from "./views/contact/contact.tsx";
import GamePage from "./views/games";
import AddGame from "./views/games/AddGame.tsx";
import EditGameForm from "./components/games/EditGameForm.tsx";
import AdminPanel from "./views/admin/AdminPanel.tsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/contact',
        element: <Contact />
    },
    {
        path: '/games',
        element: <GamePage />
    },
    {
        path: '/addgame',
        element: <AddGame />
    },
    {
        path: '/edit-game/:id',
        element: <EditGameForm />
    },
    {
        path: '/admin',
        element: <AdminPanel />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
);
