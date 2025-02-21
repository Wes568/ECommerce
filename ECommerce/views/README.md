## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Organização de pastas da interface

- `app`: Pasta geral da aplicação.

  - `_components`: Pasta com componentes reutilizáveis.

    - `header`: Componente do cabeçalho da aplicação.
      - `_actions`: Todas as funções que fazem requisição para API.
      - `_components`: Componentes do cabeçalho.
      - `_constants`: Constantes do cabeçalho, por exemplo listas de opções.
    - `ui`: Pasta onde fica armazenado todos os UI do shadcn.

  - `_context`: Pasta com os react context da aplicação.

  - `_hooks`: Pasta com os hooks da aplicação.

    - `products`: Contém a função com React Query em relação a actions do produto.
    - `user`: Contém a função com React Query em relação a actions do usuário.

  - `_lib`: Útilitário do shadcn.
  - `providers`: Contém os providers da aplicação.

  - `(home)`: Componente da página home da aplicação.

    - `_actions`: Todas as funções que fazem requisição para API.

  - `product-management`: Componente da página de cadastro de produtos da aplicação.

    - `_actions`: Todas as funções que fazem requisição para API.
    - `_components`: Componentes do cadastro de produtos.
    - `_constants`: Constantes do cadastro de produtos, por exemplo listas de opções.

  - `public`: Pasta onde costuma ser armazenado as imagens da aplicação.

## React Query

Neste projeto estamos utilizando uma nova tecnologia do React, o React Query e aqui vou te ajudar a entender como funciona:

- **useQuery**: É uma função que você pode usar para fazer requisições de GET para API, utilizando sempre queryKey: [`NOME DA FUNÇÃO`] para criação de uma chave sendo assim toda hora que fizemos um POST, PUT ou DELETE o GET vai se atualizar sozinho e por final queryFn onde é armazenado a nossa função de GET.

- **useMutation**: É uma função que você pode usar para fazer requisições de POST, PUT ou DELETE para API, utilizando o mutationFn para armazenar nossa função HTTP, onSucess para realizar uma ação toda vez que for bem-sucedido a nossa requisição com isso nós sempre optamos por atualizar a lista de GET com qqueryClient.invalidateQueries({ queryKey: [`NOME DA FUNÇÃO`] }) e onError para tratamentos de erros.
