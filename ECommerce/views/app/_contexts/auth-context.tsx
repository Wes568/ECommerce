"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

export interface IProducts {
  produtoId: number | null;
  nome: string | null;
  descricaoCurta: string | null;
  descricaoDetalhada: string | null;
  preco: number | null;
  imagemUrl: string | null;
  imagemThumbnailUrl: string | null;
  isProdutoPreferido: boolean | null;
  emEstoque: boolean | null;
  categoriaId: string | null;
  registerUserId: number | null;
  categoria: ICategory;
}

interface ICategory {
  categoriaId: number;
  nome: string;
  descricao: string;
}

export interface IAuth {
  username?: string | null;
  token: string | null;
}

interface AuthContextType {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth>>;
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
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

  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedProducts = localStorage.getItem("products");
    if (storedToken && storedUsername) {
      setAuth({
        username: storedUsername,
        token: storedToken,
      });
    }
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
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
