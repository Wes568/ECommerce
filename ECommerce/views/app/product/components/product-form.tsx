"use client";

import React, { useState } from "react";
import { Loader2, PencilIcon, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { productsCategory } from "../constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { MoneyInput } from "@/app/_components/money-input";
import { Textarea } from "@/app/_components/ui/textarea";
import { Switch } from "@/app/_components/ui/switch";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useAuth } from "@/app/_contexts/auth-context";
import { useProductUser } from "@/app/_contexts/product-user-context";
import { IProduct } from "@/app/_types/product";
import { upsertProductRequest } from "@/app/_actions/product";

const validCategoryValues = productsCategory.map((category) => category.value);

const formSchema = z.object({
  nome: z
    .string()
    .min(1, { message: "Por favor, preencha o nome do produto." }),
  categoriaId: z.number().refine((id) => validCategoryValues.includes(id), {
    message: "A categoria selecionada é inválida.",
  }),
  descricaoCurta: z
    .string()
    .min(1, { message: "Por favor, preencha a curta descrição do produto." }),
  descricaoDetalhada: z.string().min(1, {
    message: "Descreva com mais detalhes as informações que o produto contém.",
  }),
  imagemUrl: z.string(),
  imagemThumbnailUrl: z.string(),
  preco: z.number({ required_error: "O preço é obrigatório." }),
  isProdutoPreferido: z.boolean({
    required_error: "Preferência sobre o produto é obrigatória.",
  }),
  emEstoque: z.boolean({
    required_error: "Informe se o produto contém alguma unidade em estoque.",
  }),
});

export interface ProductFormProps {
  product?: IProduct;
  edit?: boolean;
}
const ProductForm = ({ product, edit }: ProductFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const { addProduct } = useProductUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product ?? {
      nome: "",
      categoriaId: 1,
      descricaoCurta: "",
      descricaoDetalhada: "",
      imagemUrl: "",
      imagemThumbnailUrl: "",
      preco: 0,
      isProdutoPreferido: false,
      emEstoque: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let productUpsert: IProduct;
    setLoading(true);
    if (product?.produtoId) {
      productUpsert = {
        ...values,
        produtoId: product.produtoId,
        registerUserId: auth.id,
        dataCriacao: product.dataCriacao,
      };
    } else {
      productUpsert = {
        ...values,
        registerUserId: auth.id,
      };
    }
    await upsertProductRequest(productUpsert);
    addProduct(productUpsert);
    setLoading(false);

    form.reset();
    setIsOpen(false);
  };

  return (
    <section className="px-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {product?.registerUserId === auth.id && edit && (
          <DialogTrigger asChild>
            <PencilIcon size={16} className="text-primary cursor-pointer" />
          </DialogTrigger>
        )}
        {!edit && (
          <DialogTrigger asChild>
            <Button className="bg-primary text-white w-full">
              <PlusCircle />
              Adicionar Produto
            </Button>
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {product ? "Edite" : "Adicione"} o seu Produto
            </DialogTitle>
            <DialogDescription>
              Preencha as informações adequeadas do seu novo produto.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome do produto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoriaId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        defaultValue={String(field.value)}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria do produto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {productsCategory.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={String(item.value)}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-5 justify-between">
                  <FormField
                    control={form.control}
                    name="isProdutoPreferido"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-2">
                        <FormLabel className="text-sm">
                          Preferência do Produto
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emEstoque"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-2">
                        <FormLabel className="text-sm">
                          Produto em Estoque
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="imagemUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagem</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            className="w-full"
                            placeholder="Informe através de uma URL a imagem do produto."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imagemThumbnailUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail</FormLabel>
                        <FormControl>
                          <Input
                            type={"text"}
                            className="w-full"
                            placeholder="Informe através de uma URL a thumbnail do produto."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="preco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <MoneyInput
                          placeholder="Digite o preço"
                          value={field.value}
                          onValueChange={({ floatValue }: any) =>
                            field.onChange(floatValue)
                          }
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descricaoCurta"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição (Curta)</FormLabel>
                      <FormControl>
                        <Input
                          type={"text"}
                          className="w-full"
                          placeholder="Informe a descrição (curta) do produto."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descricaoDetalhada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição (Detalhada)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Informe a descrição (detalhada) do produto."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {loading ? (
                  <Button className="text-white" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Cadastrando
                  </Button>
                ) : (
                  <Button className="text-white" type="submit">
                    Cadastrar
                  </Button>
                )}
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductForm;
