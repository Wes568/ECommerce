"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { allProductsRequest } from "@/app/(home)/_actions";
import { useAuth } from "@/app/_contexts/auth-context";
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

export const useGetProductsByUser = (userId: string | null) => {
  return useQuery({
    queryKey: ["getProductsByUser", userId],
    queryFn: () => getProductsByUser(userId),
  });
};

export const useUpsertProduct = () => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  return useMutation({
    mutationFn: upsertProductRequest,
    onSuccess: (data) => {
      toast.success("Produto criado com sucesso!");
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ["getProductsByUser", auth.id] });
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage = error.response?.data?.errorMessage || "Erro ao cadastrar/registrar produto";
      toast.error(errorMessage);
      console.error("Erro ao logar usuário:", error);
    }
  });
}

//No useMutation, o React Query não executa automaticamente, então os parâmetros vêm de mutate(data).
//No useQuery, o React Query executa automaticamente, então precisa que os parâmetros sejam passados via queryKey, garantindo reatividade e controle de cache.

