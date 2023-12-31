import React, { createContext, useState } from "react";
import { Preferences } from "../api/types";
import { useQueryClient } from "react-query";

export interface User {
  id: number;
  name: string;
  email: string;
  preferences: Preferences;
}

export interface AuthResponse {
  user: User;
  auth_token: string;
}

export interface IAuthContext {
  signin: (authData: AuthResponse) => void;
  signout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const queryClient = useQueryClient();

  const signin = (authData: AuthResponse) => {
    if (!authData.auth_token) {
      throw new Error("Token not provided");
    }
    localStorage.setItem("authToken", authData.auth_token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    queryClient.setQueryData(["preferences"], authData.user.preferences);
    setIsAuthenticated(true);
    setToken(authData.auth_token);
  };

  const signout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    queryClient.removeQueries(["preferences"]);

    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ signin, signout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
