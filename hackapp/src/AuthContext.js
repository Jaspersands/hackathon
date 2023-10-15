// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    // Check local storage for the user's authentication information
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : -1;
  });

  const login = (userId) => {
    // Save the user's authentication information in local storage
    localStorage.setItem('userId', userId.toString());
    setLoggedIn(userId);
  };

  const logout = () => {
    // Remove the user's authentication information from local storage
    console.log(localStorage);
    localStorage.removeItem('userId');
    console.log(localStorage);
    setLoggedIn(-1);
    console.log(loggedIn);
  };

  // ...

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
