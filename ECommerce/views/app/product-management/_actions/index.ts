import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
  isProdutoPreferido: boolean;
  emEstoque: boolean;
}

const upsertProductRequest = async (product: IProduct) => {
  let response;
  if (product.produtoId) {
    response = await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/${product.produtoId}`)
  } else {
    response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/Register`, product)
  }
  return response.data
}
export const useUpsertProduct = () => {
  return useMutation({
    mutationFn: upsertProductRequest,
    onSuccess: () => {
      toast.success("Produto criado com sucesso!");
    },
    onError: (error) => {
      toast.error("Ocorreu um erro ao criar o produto");
      console.error("Erro ao logar usuário:", error);
    }
  });
}