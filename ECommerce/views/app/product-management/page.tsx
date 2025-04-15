"use client";

import { useCallback, useEffect, useState } from "react";
import Loading from "../components/loading";
import { useAuth } from "../_contexts/auth-context";
import { useProductUser } from "../_contexts/product-user";
import { getProductsByUserRequest } from "../_actions/product";
import ProductForm from "../product/components/product-form";
import ProductCard from "../product/components/product-card";

const ProductManagement = () => {
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const { products, setProducts } = useProductUser();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const response = await getProductsByUserRequest(auth.id);
    setProducts(response.products);
    setLoading(false);
  }, [auth.id, setProducts]);

  useEffect(() => {
    if (!auth.id) return;
    fetchProducts();
  }, [fetchProducts, auth.id]);

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
        {loading ? (
          <Loading />
        ) : (
          <div className="flex justify-center flex-wrap gap-5 lg:justify-normal">
            {products &&
              products.map((item, index) => (
                <ProductCard key={index} product={item} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductManagement;
