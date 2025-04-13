"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";
import { IProduct } from "../product-management/_actions";


interface IProductsUserContext {
  products: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  addProduct: (product: IProduct) => void;
  removeProduct: (produtoId: string) => void;
}

// Criando o contexto
const ProductUser = createContext<IProductsUserContext | undefined>(undefined);

// Provedor do contexto
interface ProductUserProviderProps {
  children: ReactNode;
}

export const ProductUserProvider = ({ children }: ProductUserProviderProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const addProduct = (product: IProduct) => {
    setProducts((prev) => {
      const index = prev.findIndex(p => p.produtoId === product.produtoId);
  
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = product;
        return updated;
      } else {
        return [...prev, product];
      }
    });
  };
  

  const removeProduct = (produtoId: string) => {
    setProducts((prev) => prev.filter((item) => item.produtoId !== produtoId));
  };

  return (
    <ProductUser.Provider value={{ products, setProducts, addProduct, removeProduct }}>
      {children}
    </ProductUser.Provider>
  );
};

// Hook para consumir o contexto
export const useProductUser = () => {
  const context = useContext(ProductUser);
  if (!context) {
    throw new Error("useProductUser must be used within a ProductUserProvider");
  }
  return context;
};
