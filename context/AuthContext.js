import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserNameFromToken } from "../utils/tokenUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (token, userRole, expiresIn) => {
    setIsLogged(true);
    setRole(userRole);
    setToken(token);

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    try {
        await Promise.all([
          AsyncStorage.setItem("isLogged", "true"),
          AsyncStorage.setItem("role", userRole),
          AsyncStorage.setItem("token", token),
          AsyncStorage.setItem("name", getUserNameFromToken(token) || ""), 
          AsyncStorage.setItem("tokenExpiration", expirationDate.toISOString()),
        ]);
      } catch (error) {
        console.error("Erro ao salvar dados de autenticação:", error);
      }

    setTimeout(logout, expiresIn * 1000);
  };

  const logout = async () => {
    setIsLogged(false);
    setRole(null);
    setToken(null);

    try {
      await AsyncStorage.removeItem("isLogged");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("tokenExpiration");
      await AsyncStorage.removeItem("name");
    } catch (error) {
      console.error("Erro ao remover dados de autenticação:", error);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedIsLogged = (await AsyncStorage.getItem("isLogged")) === "true";
        const storedRole = await AsyncStorage.getItem("role");
        const storedToken = await AsyncStorage.getItem("token");
        const tokenExpiration = await AsyncStorage.getItem("tokenExpiration");

        if (storedIsLogged && storedToken && storedRole && tokenExpiration) {
          const expirationDate = new Date(tokenExpiration);

          if (expirationDate > new Date()) {
            setIsLogged(true);
            setRole(storedRole);
            setToken(storedToken);

            const timeRemaining = expirationDate.getTime() - new Date().getTime();
            setTimeout(logout, timeRemaining);
          } else {
            logout();
          }
        }
      } catch (error) {
        console.error("Erro ao verificar status de autenticação:", error);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, role, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
