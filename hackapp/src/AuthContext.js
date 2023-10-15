// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(-1);

  const login = (userId) => {
    // You may want to implement your login logic here
    setLoggedIn(userId);
  };

  const logout = () => {
    // You may want to implement your logout logic here
    setLoggedIn(-1);
  };


  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
