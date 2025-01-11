"use client";

import React, { useState } from "react";

import { Loader2, PlusCircle } from "lucide-react";
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
import { productsCategory, tinyInt } from "../_constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { MoneyInput } from "@/app/_components/money-input";
import { Textarea } from "@/app/_components/ui/textarea";
import { IProduct } from "../_actions";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

const validCategoryValues = productsCategory.map((category) => category.value);
const tinyIntValues = tinyInt.map((item) => item.value);

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
  preco: z.number({ required_error: "O preço é obrigatório." }).positive({
    message: "O preço deve ser positivo.",
  }),
  isProdutoPreferido: z
    .number()
    .refine((value) => tinyIntValues.includes(value), {
      message: "Preferência sobre o produto é obrigatória.",
    }),
  emEstoque: z.number().refine((value) => tinyIntValues.includes(value), {
    message: "Informe se o produto contém alguma unidade em estoque.",
  }),
});

interface ProductFormProps {
  product?: IProduct;
}
const ProductForm = ({ product }: ProductFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product ?? {
      nome: "",
      categoriaId: 1,
      descricaoCurta: "",
      descricaoDetalhada: "",
      imagemUrl: "",
      imagemThumbnailUrl: "",
      preco: 50,
      isProdutoPreferido: 0,
      emEstoque: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <section className="px-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primary text-white w-full">
            <PlusCircle />
            Adicionar Produto
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicione o seu Produto</DialogTitle>
            <DialogDescription>
              Preencha as informações adequeadas do seu novo produto.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[600px] w-full rounded-md border p-4 lg:hidden">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-3"
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
                <div className="flex flex-col gap-5 justify-between lg:flex-row lg:gap-0">
                  <FormField
                    control={form.control}
                    name="categoriaId"
                    render={({ field }) => (
                      <FormItem className="w-full lg:w-[150px]">
                        <FormLabel>Categoria</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
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
                  <FormField
                    control={form.control}
                    name="isProdutoPreferido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferência do Produto</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a preferência do produto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tinyInt.map((item) => (
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
                  <FormField
                    control={form.control}
                    name="emEstoque"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Produto em Estoque</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Informe se o produto está em estoque" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tinyInt.map((item) => (
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
                </div>

                <div className="flex flex-col gap-5 justify-between lg:flex-row lg:gap-0">
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
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <MoneyInput
                          placeholder="Digite o preço"
                          value={field.value}
                          onValueChange={({ floatValue }) =>
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
          <div className="hidden lg:block">
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
                <div className="flex flex-col justify-between lg:flex-row">
                  <FormField
                    control={form.control}
                    name="categoriaId"
                    render={({ field }) => (
                      <FormItem className="w-full lg:w-[150px]">
                        <FormLabel>Categoria</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
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
                  <FormField
                    control={form.control}
                    name="isProdutoPreferido"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferência do Produto</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a preferência do produto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tinyInt.map((item) => (
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
                  <FormField
                    control={form.control}
                    name="emEstoque"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Produto em Estoque</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Informe se o produto está em estoque" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tinyInt.map((item) => (
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
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <MoneyInput
                          placeholder="Digite o preço"
                          value={field.value}
                          onValueChange={({ floatValue }) =>
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
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductForm;
