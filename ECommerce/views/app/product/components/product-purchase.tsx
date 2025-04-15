import { IProduct } from "@/app/_types/product";
import React from "react";

interface ProductPurchaseProps {
  product: IProduct;
}

const ProductPurchase = ({ product }: ProductPurchaseProps) => {
  return <div>{product.nome}</div>;
};

export default ProductPurchase;
