"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { loginRequest, registerRequest } from "@/app/_components/header/_actions";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
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
    onError: (error: AxiosError<any>) => {
      const errorMessage = error.response?.data?.errorMessage || "Erro ao fazer login";
      toast.error(errorMessage);
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
    onError: (error: AxiosError<any>) => {
      const errorMessage = error.response?.data?.errorMessage || "Erro ao registrar usuário";
      toast.error(errorMessage);
      console.error("Erro ao registrar usuário:", error);
    }
  });
}