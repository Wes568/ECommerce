"use server"

import api from "@/app/index";

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
  registerUserId?: string | null;
  categoria?: ICategory;
}


interface ICategory {
  categoriaId: number;
  nome: string;
  descricao: string;
}


export const upsertProductRequest = async (product: IProduct) => {
  let response;
  if (product.produtoId) {
    response = await api.put("/Produto/Update/", product)
  } else {
    response = await api.post("/Produto/Register", product)
  }
  return response.data
}

export const getProductsByUser = async (userId: string | null ) => {
  try {
    const response = await api.get(`/Produto/ListProductsByUser/?userId=${userId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}


