"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { getCookie } from "../_global/functions";

export interface IAuth {
  id: string | null;
  username?: string | null;
}

interface AuthContextType {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
}

interface IChildren {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: IChildren) => {
  const [auth, setAuth] = useState<IAuth>({
    id: null,
    username: null,
  });

  useEffect(() => {
    const storedUsername = getCookie("username");
    const storedUserId = getCookie("userId");
    if (storedUsername && storedUserId) {
      setAuth({
        id: storedUserId,
        username: storedUsername,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth tem que estar dentro de AuthProvider");
  }
  return context;
};
