"use server"

import api from "@/app/index";
import { revalidatePath } from "next/cache";

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
}

export interface IProducts {
  produtoId?: string
  nome: string
  descricaoCurta: string
  descricaoDetalhada: string
  preco: number
  imagemUrl: string
  imagemThumbnailUrl: string
  isProdutoPreferido: boolean
  emEstoque: boolean
  categoriaId: number
  registerUserId: string
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
    response = await api.put(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/Update/`, product)
  } else {
    response = await api.post(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/Register`, product)
  }
  revalidatePath("/product-management")
  return response.data
}

export const getProductsByUser = async (userId: string | null) => {
  try {
    const response = await api.get(`/Produto/ListProductsByUser/${userId}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
