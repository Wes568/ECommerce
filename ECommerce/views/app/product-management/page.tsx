"use client";

import ProductForm from "./_components/product-form";

const Settings = () => {
  return (
    <section className="bg-primary-foreground mt-[98px] lg:mt-[134px]">
      <div className="container">
        <div className="flex flex-col items-center py-4 gap-5 justify-between lg:flex-row lg:gap-0">
          <h1 className="text-xl">Gerenciamento de Produtos</h1>
          <ProductForm />
        </div>
      </div>
    </section>
  );
};

export default Settings;
