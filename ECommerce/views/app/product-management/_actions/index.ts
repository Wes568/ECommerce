"use server"

import api from "@/app";

export interface IProduct {
  produtoId?: string;
  nome: string;
  categoriaId: number;
  descricaoCurta: string;
  descricaoDetalhada: string;
  imagemUrl: string;
  imagemThumbnailUrl: string;
  preco: number;
  isProdutoPreferido: boolean;
  emEstoque: boolean;
  registerUserId: string | null;
}


export const upsertProductRequest = async (product: IProduct) => {
  let response;
  if (product.produtoId) {
    response = await api.put(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/Update/`, product)
  } else {
    response = await api.post(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/Register`, product)
  }
  return response.data
}

export const getProductsByUser = async (userId: string | null) => {
  const response = await api.get(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/ListProductsByUser/${userId}`)
  return response.data
}
