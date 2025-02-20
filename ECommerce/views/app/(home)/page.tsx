"use client";

import React from "react";
import { useAllProducts } from "../_hooks/products";
import Loading from "../_components/loading";
import ProductCard from "../_components/product-card";
import { IProducts } from "../_contexts/auth-context";

const Home = () => {
  const { data, isPending } = useAllProducts();

  const productsArray: IProducts[] = data?.products?.produtos ?? [];
  const category = data?.products?.categoriaAtual ?? "Categoria";

  return (
    <section>
      <div className="bg-primary-foreground p-4 mt-[98px] lg:mt-[134px] lg:p-0">
        <div className="container">
          <div className="flex flex-col items-center py-4 gap-5 justify-between lg:flex-row lg:gap-0">
            <h1 className="text-xl">{category}</h1>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        {isPending ? (
          <Loading />
        ) : (
          <div className="flex justify-center flex-wrap gap-5 lg:justify-normal">
            {productsArray.map((item) => (
              <ProductCard key={item.produtoId} product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
