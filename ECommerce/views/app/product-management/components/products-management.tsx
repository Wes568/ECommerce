"use client";

import { useProductUser } from "@/app/_contexts/product-user-context";
import { IProduct } from "@/app/_types/product";
import ProductCard from "@/app/product/components/product-card";
import ProductForm from "@/app/product/components/product-form";
import { useEffect } from "react";

interface ProductsManagementProps {
  userProducts: IProduct[];
}

const ProductsManagement = ({ userProducts }: ProductsManagementProps) => {
  const { setProducts } = useProductUser();

  useEffect(() => {
    setProducts(userProducts);
  }, [userProducts, setProducts]);

  return (
    <section>
      <div className="bg-foreground mt-[98px] lg:mt-[134px]">
        <div className="container">
          <div className="flex flex-col items-center py-4 gap-5 justify-between lg:flex-row lg:gap-0">
            <h1 className="text-xl text-white">Gerenciamento de Produtos</h1>
            <ProductForm edit={false} />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="flex justify-center flex-wrap gap-5 lg:justify-normal">
          {Array.isArray(userProducts) && userProducts.length > 0 ? (
            userProducts.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductsManagement;
