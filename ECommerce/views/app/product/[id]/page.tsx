"use client";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProductPurchase from "../components/product-purchase";
import { IProduct } from "../../_types/product";
import { getProductDetails } from "@/app/_actions/product";

const Product = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const params = useParams();
  const id = params.id;

  const fetchProduct = useCallback(async () => {
    if (typeof id === "string") {
      const productId = parseInt(id);
      const response = await getProductDetails(productId);
      setProduct(response.product);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct, id]);

  return (
    <div className="container mt-[98px] lg:mt-[134px]">
      <ProductPurchase product={product} />
    </div>
  );
};

export default Product;
