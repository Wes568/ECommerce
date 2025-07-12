"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/app/_contexts/auth-context";
import { registerRequest } from "@/app/_actions/user";
import { toast } from "sonner";

const formSchema = z.object({
  userName: z
    .string()
    .min(1, { message: "Por favor, preencha o seu usuário." }),
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
  password: z
    .string()
    .min(6, {
      message: "A senha deve conter no mínimo 6 caracteres.",
    })
    .regex(/[\W_]/, {
      message: "A senha deve conter pelo menos um caractere especial.",
    }),
});

const RegisterForm = () => {
  const [view, setView] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuth } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const data = await registerRequest(values);
      setAuth({
        username: data.user.userName,
        token: data.token,
        id: data.user.id,
      });
      localStorage.setItem("token", data.token);
      toast.success(`Bem-vindo(a), ${data.userName}!`);
    } catch (error) {
      console.error(error);
      toast.error(
        `Ocorreu um erro ao se registrar, por favor tente novamente.`
      );
    }
    setLoading(false);
  };

  return (
    <section>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-foreground text-white w-full">
            Cadastre-se
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Bem-vindo!</DialogTitle>
            <DialogDescription>
              Para criar sua conta, por favor insira as credenciais abaixo.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu usuário" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RegisterForm;
