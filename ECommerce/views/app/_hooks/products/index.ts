"use client"

import { allProductsRequest } from "@/app/(home)/_actions";
import { upsertProductRequest } from "@/app/product-management/_actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: allProductsRequest,
  });
};

export const useUpsertProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertProductRequest,
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
    },
    onError: (error) => {
      toast.error("Ocorreu um erro ao criar o produto");
      console.error("Erro ao logar usuário:", error);
    }
  });
}