"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { allProductsRequest } from "@/app/(home)/_actions";
import { getProductsByUser, upsertProductRequest } from "@/app/product-management/_actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: allProductsRequest,
  });
};

export const useGetProductsByUser = () => {
  return useQuery({
    queryKey: ["getProductsByUser"],
    queryFn: getProductsByUser,
  });
};

export const useUpsertProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: upsertProductRequest,
    onSuccess: (data) => {
      toast.success("Produto criado com sucesso!");
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ["getProductsByUser"] });
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage = error.response?.data?.errorMessage || "Erro ao cadastrar/registrar produto";
      toast.error(errorMessage);
      console.error("Erro ao logar usuário:", error);
    }
  });
}

