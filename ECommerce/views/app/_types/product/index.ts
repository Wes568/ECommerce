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
  dataCriacao?: Date;
  registerUserId?: string | null;
  categoria?: ICategory;
}

interface ICategory {
  categoriaId: number;
  nome: string;
  descricao: string;
}
