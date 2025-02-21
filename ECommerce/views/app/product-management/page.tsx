"use client";

import Loading from "../_components/loading";
import ProductCard from "../_components/product-card";
import { IProducts, useAuth } from "../_contexts/auth-context";
import { useGetProductsByUser } from "../_hooks/products";
import ProductForm from "./_components/product-form";

const Settings = () => {
  const { auth } = useAuth();
  const { data, isPending } = useGetProductsByUser(auth.id);
  const productsUser: IProducts[] = data?.products;
  return (
    <section>
      <div className="bg-foreground mt-[98px] lg:mt-[134px]">
        <div className="container">
          <div className="flex flex-col items-center py-4 gap-5 justify-between lg:flex-row lg:gap-0">
            <h1 className="text-xl text-white">Gerenciamento de Produtos</h1>
            <ProductForm />
          </div>
        </div>
      </div>
      <div className="container mt-5">
        {isPending ? (
          <Loading />
        ) : (
          <div className="flex justify-center flex-wrap gap-5 lg:justify-normal">
            {productsUser.map((item) => (
              <ProductCard key={item.produtoId} product={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Settings;
