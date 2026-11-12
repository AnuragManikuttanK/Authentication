
import { createContext, useState, useEffect } from 'react';
import {getUserByEmail,checkUsername as checkUsernameApi, registerUser,getUserById} from '../services/authApi';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [isLoading, setIsLoading] = useState(true);


    const checkUsername = async (username) => {

        const response = await checkUsernameApi(username);

        return response.data.length > 0;
    };


    const register = async (userData) => {

        const usernameExists = await checkUsername(
            userData.username
        );

        if (usernameExists) {
            throw new Error('Username already exists');
        }

        const emailResponse = await getUserByEmail(
            userData.email
        );

        if (emailResponse.data.length > 0) {
            throw new Error('Email already registered');
        }

        const response = await registerUser({
            ...userData,
            avatar: '',
            createdAt: new Date().toISOString()
        });

        return response.data;
    };


    const login = async (credentials) => {

        const response = await getUserByEmail(
            credentials.email
        );

        const foundUser = response.data.find(
            (item) => item.password === credentials.password
        );

        if (!foundUser) {
            throw new Error('Invalid email or password');
        }

        setUser(foundUser);

        localStorage.setItem('userId', foundUser.id);

        return foundUser;
    };


    const logout = () => {

        localStorage.removeItem('userId');

        setUser(null);
    };


    const isAuthenticated = () => {
        return user !== null;
    };


    // Fetch current user
    const fetchCurrentUser = async () => {

        const userId = localStorage.getItem('userId');

        if (!userId) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {

            const response = await getUserById(userId);

            setUser(response.data);

        } catch (error) {

            localStorage.removeItem('userId');

            setUser(null);

        } finally {

            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchCurrentUser();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                register,
                logout,
                isAuthenticated,
                fetchCurrentUser,
                checkUsername
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
