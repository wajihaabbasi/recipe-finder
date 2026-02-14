import { useState } from 'react';
import { AuthContext } from './AuthContext';

/**
 * The Provider is a wrapper component. 
 * It provides the global state to any children nested inside it.
 */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //Login user logic
    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("token", token);
    };
    //Logout logic (clears user data)
    const logout = () => {
        localStorage.removeItem("token");   
        setUser(null);
        
    };

   
  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};