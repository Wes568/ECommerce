"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useAllProducts } from "../_hooks/products";

const Home = () => {
  const { data, isPending } = useAllProducts();

  const produtosArray = data?.products?.produtos ?? [];
  const categoriaAtual = data?.products?.categoriaAtual ?? "Categoria";

  return (
    <section>
      <div className="bg-primary-foreground p-4 mt-[98px] lg:mt-[134px] lg:p-0">
        <div className="container">
          <div className="flex flex-col items-center py-4 gap-5 justify-between lg:flex-row lg:gap-0">
            <h1 className="text-xl">{categoriaAtual}</h1>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        {isPending ? (
          <div className="flex items-center mt-20 justify-center">
            <Loader2 className="h-[50px] w-[50px] animate-spin" />
          </div>
        ) : (
          <ul>
            {produtosArray.map((product: any, index: number) => (
              <li key={product.id || product.nome || index}>{product.nome}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Home;
