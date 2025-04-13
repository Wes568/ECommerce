"use client";

import React, { useEffect, useState } from "react";
import Loading from "../_components/loading";
import ProductCard from "../_components/product-card";
import { IProduct } from "../product-management/_actions";
import { allProductsRequest } from "./_actions";
import { toast } from "sonner";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await allProductsRequest()
        setCategory(data.products.categoriaAtual)
        setData(data.products.produtos);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Ocorreu um erro ao buscar os produtos");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts()
  }, []);

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
