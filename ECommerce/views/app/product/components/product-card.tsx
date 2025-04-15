import React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useAuth } from "../../_contexts/auth-context";
import { usePathname } from "next/navigation";
import ProductForm from "./product-form";
import ProductDelete from "./product-delete";
import { IProduct } from "@/app/_types/product";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { auth } = useAuth();
  const pathname = usePathname();
  const formatToBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="bg-glass shadow-md flex justify-between flex-col w-72 rounded-sm p-4 transition duration-300 hover:scale-105">
      <img
        className="h-64 rounded-sm relative"
        alt="Imagem do Produto"
        src={product.imagemUrl ?? ""}
        width={300}
      />
      <div className="flex mt-2 gap-2 flex-col">
        <div className="flex flex-col">
          <div className="flex gap-2 justify-between items-center">
            <h2 className="text-sm">{product.nome}</h2>
            {auth.id === product.registerUserId &&
              pathname === "/product-management" && (
                <div className="flex gap-2">
                  <ProductForm product={product} edit={true} />
                  {product.produtoId && (
                    <ProductDelete productId={product.produtoId} />
                  )}
                </div>
              )}
          </div>
        </div>
        <span className="text-primary text-2xl font-bold">
          {formatToBRL(product.preco ?? 0)}
        </span>
        <div className="flex gap-2 items-center">
          <Badge className="text-xs bg-muted text-primary">
            Categoria: {product.categoria?.nome}
          </Badge>
          <Badge className="text-xs bg-muted text-primary">
            {product.emEstoque === true ? "Em Estoque" : "Sem Estoque"}
          </Badge>
        </div>
      </div>
      <div className="flex mt-5 flex-col gap-2">
        <Button className="text-white" asChild>
          <Link href={`product/${product.produtoId}`}>Comprar agora</Link>
        </Button>
        <Button className=" bg-foreground text-white">
          Adicionar ao carrinho
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
