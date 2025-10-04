"use client";

import { IProduct } from "@/app/_types/product";
import RatingStars from "@/app/_components/rating-stars";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { currencyFormat } from "@/app/_global/functions";
import { MinusCircle, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import PaymentOptions from "./payment-options";

interface ProductPurchaseProps {
  product: IProduct;
}

const ProductPurchase = ({ product }: ProductPurchaseProps) => {
  const [currency, setCurrency] = useState<string>();
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    if (product.preco) {
      setCurrency(currencyFormat(product.preco));
    }
  }, [product.preco]);

  const handleAmountChange = (type: string) => {
    let newAmount = type === "plus" ? amount + 1 : amount - 1;
    if (newAmount === 0) {
      newAmount = 1;
    }
    setAmount(newAmount);
    setCurrency(currencyFormat(product.preco * newAmount));
  };

  const tempRating = [0, 3, 1, 2, 4];

  return (
    <section className="mt-40 px-5 lg:px-0">
      <div className="flex flex-col container shadow-md rounded-md p-4 lg:flex-row">
        <div className="flex flex-col gap-10 w-full justify-between lg:flex-row">
          <img
            className="rounded-md"
            src={product.imagemThumbnailUrl}
            width={300}
            alt={product.nome}
          />
          <div className="flex flex-col w-56 gap-5">
            <Badge className="w-28 flex justify-center text-white">
              {product.categoria?.nome
                ? product.categoria?.nome
                : "Sem categoria"}
            </Badge>
            <h2 className="font-semibold text-xl">{product.nome}</h2>
            <RatingStars rating={tempRating} />

            <div className="flex flex-col">
              <span className="font-semibold text-primary text-4xl">
                {currency}
              </span>
              <PaymentOptions />
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleAmountChange("minus")}
                  className="bg-muted-foreground"
                >
                  <MinusCircle />
                </Button>
                {amount}
                <Button
                  onClick={() => handleAmountChange("plus")}
                  className="bg-muted-foreground"
                >
                  <PlusCircle />
                </Button>
              </div>
            </div>

            <div className="flex gap-2 flex-col">
              <Button className="w-56 text-white">Comprar Agora</Button>
              <Button className="w-56 bg-foreground text-white">
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
          <div className="flex flex-col w-full gap-5 border-2 p-4 rounded-md">
            <span className="text-sm text-primary font-semibold">
              Mais informações
            </span>
            <p>{product.descricaoDetalhada}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPurchase;
