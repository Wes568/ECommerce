"use client";

import { IProducts } from "@/app/_types/product";
import ProductCard from "@/app/product/components/product-card";
import { useEffect, useState } from "react";

interface ProductsHomeProps {
  products: IProducts;
}

const ProductsHome = ({ products }: ProductsHomeProps) => {
  const [category, setCategory] = useState<string>();

  useEffect(() => {
    if (products.categoriaAtual) {
      setCategory(products.categoriaAtual);
    }
  }, [products]);

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
        <div className="flex justify-center flex-wrap gap-5 lg:justify-normal">
          {products.produtos.map((item) => (
            <ProductCard key={item.produtoId} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsHome;
