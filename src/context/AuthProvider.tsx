import  { createContext, useState } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
   
}

export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
   
});

const AuthProvider = ({ children }) => {
    const [isLoggedIn, ] = useState(false);

  

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
