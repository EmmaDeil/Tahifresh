// Directory: src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the user structure mapping to your facility personnel records
interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'technician' | 'manager' | 'customer';
}

interface AuthContextType {
    user: UserProfile | null;
    login: (userData: UserProfile) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // In a production environment, initialize this by checking localStorage or a secure cookie
    const [user, setUser] = useState<UserProfile | null>(null);

    const login = (userData: UserProfile) => {
        setUser(userData);
        // Add logic here to persist the session (e.g., localStorage.setItem('user', JSON.stringify(userData)))
    };

    const logout = () => {
        setUser(null);
        // Add logic here to clear the session (e.g., localStorage.removeItem('user'))
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming the context within components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider to track system access.');
    }
    return context;
};