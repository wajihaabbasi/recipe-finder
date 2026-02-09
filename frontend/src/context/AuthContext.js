import { createContext } from 'react';

/** * This creates the 'Shape' of our authentication data. 
 * We initialize it so components know what to expect (user, login, logout).
 */
export const AuthContext = createContext();