import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";


export interface IProduct {
  produtoId?: number;
  nome: string;
  categoriaId: number;
  descricaoCurta: string;
  descricaoDetalhada: string;
  imagemUrl: string;
  imagemThumbnailUrl: string;
  preco: number;
  isProdutoPreferido: number;
  emEstoque: number;
}

export const upsertProduct = async (product: IProduct) => {
  try {
    let response: AxiosResponse<unknown, unknown> | undefined;
    if (product.produtoId) {
      console.log("Alteração do Produto")
    } else {
      response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/Login`)
    }
    return response ? response.data : null;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error("Não foi possível cadastrar seu produto");
      console.error("Erro ao cadastrar produto:", error);
    }
  }
}