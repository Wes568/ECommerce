"use client";

import { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../../ui/menubar";
import { CircleUserRound, Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RegisterForm from "./register-form";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  password: z.string().min(6, {
    message: "A senha deve conter no mínimo 6 dígitos.",
  }),
});

const LoginForm = () => {
  const [view, setView] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="gap-2">
            <CircleUserRound size={30} />
            <div className="flex flex-col">
              <h2 className="font-semibold ">Faça seu login</h2>
              <p className="text-sm">ou Cadastre-se</p>
            </div>
          </MenubarTrigger>
          <MenubarContent className="p-4 w-[320px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite seu e-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="w-full relative">
                          <Input
                            type={view ? "text" : "password"}
                            className="w-full relative"
                            placeholder="Digite sua senha"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-0"
                            onClick={() => setView(!view)}
                          >
                            {view ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col">
                  <Link className="text-sm mb-5" href={"/forgot-password"}>
                    Esqueci minha senha
                  </Link>
                  <div className="flex flex-col gap-2">
                    <Button className="text-white w-full" type="submit">
                      Entrar
                    </Button>
                    <RegisterForm />
                  </div>
                </div>
              </form>
            </Form>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default LoginForm;
