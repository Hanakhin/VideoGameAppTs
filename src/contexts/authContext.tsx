import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { auth } from '../../server/firebase/firebaseConfig.ts';
import { onAuthStateChanged, User } from "@firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Définissez les types de rôles possibles
type UserRole = 'user' | 'admin' | 'moderator';

interface AuthContextType {
    currentUser: User | null;
    userLogged: boolean;
    loading: boolean;
    logout: () => Promise<void>;
    userRole: UserRole | null;
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
    const [userRole, setUserRole] = useState<UserRole | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setUserLogged(!!user);

            if (user) {
                // Récupérer le rôle de l'utilisateur depuis Firestore
                const db = getFirestore();
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    setUserRole(userDoc.data().role as UserRole);
                } else {
                    // Si le document n'existe pas, définissez un rôle par défaut
                    setUserRole('user');
                }
            } else {
                setUserRole(null);
            }

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
        logout,
        userRole
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
