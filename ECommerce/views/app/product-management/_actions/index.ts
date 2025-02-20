"use server"

import api from "@/app";

export interface IProduct {
  produtoId?: number;
  nome: string;
  categoriaId: number;
  descricaoCurta: string;
  descricaoDetalhada: string;
  imagemUrl: string;
  imagemThumbnailUrl: string;
  preco: number;
  isProdutoPreferido: boolean;
  emEstoque: boolean;
}

export const upsertProductRequest = async (product: IProduct) => {
  let response;
  if (product.produtoId) {
    response = await api.put(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/${product.produtoId}`)
  } else {
    response = await api.post(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/Register`, product)
  }
  return response.data
}
