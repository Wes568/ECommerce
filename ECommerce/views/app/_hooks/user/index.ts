"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { loginRequest, registerRequest } from "@/app/_components/header/_actions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = (setAuth: (auth: any) => void) => {
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setAuth({ username: data.user.userName, token: data.token });
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.userName);
      toast.success(`Bem-vindo, ${data.user.userName}`);
    },
    onError: (error) => {
      toast.error("Nome de usuário ou senha inválidos");
      console.error("Erro ao logar usuário:", error);
    }
  });
};

export const useRegister = (setAuth: (auth: any) => void) => {
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (data) => {
      setAuth({ username: data.user.userName, token: data.token });
      localStorage.setItem("token", data.token);
      toast.success(`Bem-vindo, ${data.user.userName}`);
    },
    onError: (error) => {
      toast.error("Erro ao registrar usuário");
      console.error("Erro ao registrar usuário:", error);
    }
  });
}