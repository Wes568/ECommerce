"use client";

import React from "react";
import { useAllProducts } from "../_hooks/products";
import Loading from "../_components/loading";
import { IProduct } from "../product-management/_actions";

export interface IAllProducts extends IProduct {
  registerUserId: number;
}

const Home = () => {
  const { data, isPending } = useAllProducts();

  const produtosArray: IAllProducts[] = data?.products?.produtos ?? [];
  const categoriaAtual = data?.products?.categoriaAtual ?? "Categoria";
  console.log(data);

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
          <Loading />
        ) : (
          <ul>
            {produtosArray.map((product, index) => (
              <li key={product.produtoId || product.nome || index}>
                {product.nome}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Home;
