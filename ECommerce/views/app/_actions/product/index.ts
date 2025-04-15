'use client'

import { IProduct } from "@/app/_types/product";
import { ApiRequisition } from "..";

const req = new ApiRequisition()

export const allProductsRequest = async () => {
  const response = await req.setPayload({
    url: "/Produto/Search/?searchString=",
    messageError: "Erro ao buscar os produtos",
  }).get();
  return response;
};

export const getProductsByUserRequest = async (userId: string | null) => {
  const response = await req.setPayload({
    url: `/Produto/ListProductsByUser/?userId=${userId}`,
    messageError: "Erro ao buscar os produtos do usuário",
  }).get();
  return response;
}

export const upsertProductRequest = async (product: IProduct) => {
  let response;

  if (product.produtoId) {
    response = await req.setPayload({
      url: "/Produto/Update/",
      content: product,
      messageSuccess: "Produto atualizado com sucesso!",
      messageError: "Erro ao atualizar o produto",
    }).put();
  } else {
    response = await req.setPayload({
      url: "/Produto/Register",
      content: product,
      messageSuccess: "Produto inserido com sucesso!",
      messageError: "Erro ao inserir o produto",
    }).post();
  }
  return response.data
}

export const deleteProductRequest = async (productId: string) => {
  const response = await req.setPayload({
    url: `/Produto/Delete/?productId=${productId}`,
    messageSuccess: "Produto excluido com sucesso!",
    messageError: "Erro ao excluir o produto",
  }).delete();
  return response
}
