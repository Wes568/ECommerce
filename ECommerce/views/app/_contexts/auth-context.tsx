"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

export interface IAuth {
  id: string | null;
  username?: string | null;
  token: string | null;
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
    token: null,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUsername && storedUserId) {
      setAuth({
        id: storedUserId,
        username: storedUsername,
        token: storedUsername,
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
