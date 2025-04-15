"use client";

import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/loading";
import ProductCard from "../product/components/product-card";
import { IProduct } from "../_types/product";
import { allProductsRequest } from "../_actions/product";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<string>();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const response = await allProductsRequest();
    setLoading(false);
    setCategory(response.products.categoriaAtual);
    setData(response.products.produtos);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section>
      <div className="bg-foreground text-white p-4 mt-[98px] lg:mt-[134px] lg:p-0">
        <div className="container">
          <div className="flex flex-col items-center py-4 gap-5 justify-between lg:flex-row lg:gap-0">
            <h1 className="text-xl">{category}</h1>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex justify-center flex-wrap gap-5 lg:justify-normal">
            {data.map((item) => (
              <ProductCard key={item.produtoId} product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
