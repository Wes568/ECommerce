"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

interface IProducts {
  produtoId: number | null;
  nome: string | null;
  descricaoCurta: string | null;
  descricaodDetalhada: string | null;
  preco: number | null;
  imagemuUrl: string | null;
  imagemThumbnailUrl: string | null;
  isProdutopPreferido: boolean | null;
  emEstoque: boolean | null;
  categoriaId: string | null;
}

export interface IAuth {
  username?: string | null;
  token: string | null;
}

interface AuthContextType {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
  products: IProducts;
  setProducts: React.Dispatch<React.SetStateAction<IProducts>>;
}

interface IChildren {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: IChildren) => {
  const [auth, setAuth] = useState<IAuth>({
    username: null,
    token: null,
  });

  const [products, setProducts] = useState<IProducts>({
    produtoId: null,
    nome: null,
    descricaoCurta: null,
    descricaodDetalhada: null,
    preco: null,
    imagemuUrl: null,
    imagemThumbnailUrl: null,
    isProdutopPreferido: null,
    emEstoque: null,
    categoriaId: null,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken && storedUsername) {
      setAuth({
        username: storedUsername,
        token: storedToken,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, products, setProducts }}>
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
