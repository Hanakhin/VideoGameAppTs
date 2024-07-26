import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { auth } from '../../server/firebase/firebaseConfig.ts';
import { onAuthStateChanged, User } from "@firebase/auth";

interface AuthContextType {
    currentUser: User | null;
    userLogged: boolean;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userLogged, setUserLogged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setUserLogged(!!user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    function logout() {
        return auth.signOut();
    }

    const value: AuthContextType = {
        currentUser,
        userLogged,
        loading,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}