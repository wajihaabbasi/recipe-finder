import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { deleteUserAccount } from '../services/api';

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

    const removeAccount = async () => {
      const token = localStorage.getItem("token");
      try{
        await deleteUserAccount(token);
            logout(); // Clean up state after successful API delete
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
      }
      
    };
  return (
    <AuthContext.Provider value={{user, login, logout, removeAccount}}>
      {children}
    </AuthContext.Provider>
  );
};