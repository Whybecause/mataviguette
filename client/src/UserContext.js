import React, { createContext, useEffect, useState } from 'react';
import authService from './services/auth.service';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ email, setUserEmail ] = useState(null);
    const [ isAdmin, setIsAdmin ] = useState(null);
    
    // appel API pour voir si le token a expiré, si oui on supprime l'user du local storage
    useEffect( () => {
        authService.isValidToken();
    }, []);

    // Appel au localstorage pour récupérer username + email
    useEffect( () => {
        authService.getCurrentUser(setUser, setUserEmail);
    }, []); 

    // Appel API pour voir si le req.userId correspond à un compte admin
    useEffect( () => {
        authService.isValidAdmin(setIsAdmin);
    }, []);   

    return (
        <UserContext.Provider
            value={{
                user,
                email,
                isAdmin,
                setUser,
                setUserEmail,
                setIsAdmin
            }}
        >
            {children}
        </UserContext.Provider>
    );
};