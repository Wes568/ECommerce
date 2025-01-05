"use client";

import { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../../ui/menubar";
import { CircleUserRound, Eye, EyeOff, Loader2 } from "lucide-react";
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
import { useAuth } from "@/app/contexts/auth-context";
import { login } from "../_actions";

const formSchema = z.object({
  userName: z
    .string()
    .min(1, { message: "Por favor, preencha o seu usuário." }),
  password: z.string().min(6, {
    message: "A senha deve conter no mínimo 6 dígitos.",
  }),
});

const LoginForm = () => {
  const [view, setView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { auth, setAuth } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      await login(values, setAuth);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ username: null, token: null });
  };

  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="gap-2">
            <CircleUserRound size={30} />
            {!localStorage.getItem("token") ? (
              <div className="flex flex-col">
                <h2 className="font-semibold ">Faça seu login</h2>
                <p className="text-sm">ou Cadastre-se</p>
              </div>
            ) : (
              <div className="flex gap-2">
                <h2 className="font-semibold ">Bem-vindo,</h2>
                <p>{auth.username}</p>
              </div>
            )}
          </MenubarTrigger>
          <MenubarContent className="p-4 w-[320px]">
            {!localStorage.getItem("token") ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome de Usuário</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome de usuário"
                            {...field}
                          />
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
                      {loading ? (
                        <Button className="text-white" disabled>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Entrando
                        </Button>
                      ) : (
                        <Button className="text-white" type="submit">
                          Entrar
                        </Button>
                      )}
                      <RegisterForm />
                    </div>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="flex flex-col gap-2">
                <Button className="text-white">
                  <Link href={"/configuracoes"}>Configurações</Link>
                </Button>
                <Button className="text-white" onClick={logout}>
                  Sair
                </Button>
              </div>
            )}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default LoginForm;
