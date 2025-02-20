import React from "react";

const Product = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;
  return <div className="container mt-[98px] lg:mt-[134px]">{id}</div>;
};

export default Product;
