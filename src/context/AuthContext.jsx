import React, { createContext, useState, useEffect } from "react";
import { loginRequest, registerUser } from "../services/api";
import { saveToken, loadToken, logoutUser, decodeToken } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);   // decoded user
  const [token, setToken] = useState(null); // raw JWT

  // On page refresh， we restore token
  useEffect(() => {
    const storedToken = loadToken();
    if (storedToken) {
      const decoded = decodeToken(storedToken);
      if (decoded) {
        setUser(decoded);
        setToken(storedToken);
      }
    }
  }, []);

 
  // REGISTER
  const register = async (username, password, role) => {
    return await registerUser(username, password, role);
  };

  // LOGIN USING JWT
  const login = async (username, password) => {
  const account = await loginRequest(username, password);
  if (!account) return false;

  
  saveToken(JSON.stringify(account));
  setToken(JSON.stringify(account));
  setUser(account);

  return true;
};

  // LOGOUT
  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
