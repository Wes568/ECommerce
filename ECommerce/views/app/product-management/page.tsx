"use client";

import { useEffect, useState } from "react";
import Loading from "../_components/loading";
import ProductCard from "../product/_components/product-card";
import { useAuth } from "../_contexts/auth-context";
import { getProductsByUser } from "../product/_actions";
import { toast } from "sonner";
import { useProductUser } from "../_contexts/product-user";
import ProductForm from "../product/_components/product-form";

const ProductManagement = () => {
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const { products, setProducts } = useProductUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsByUser(auth.id);
        setProducts(data.products);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        toast.error("Ocorreu um erro ao buscar os produtos");
      } finally {
        setLoading(false);
      }
    };

    if (auth.id) {
      fetchProducts();
    }
  }, [auth.id]);
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
              products.map((item) => (
                <ProductCard key={item.nome} product={item} />
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductManagement;
