/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface LoginInterface {
  userName: string;
  password: string;
}

interface RegisterInterface {
  userName: string;
  email: string;
  password: string;
}


const loginRequest = async (credentials: LoginInterface) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/Account/Login`, credentials);
  return response.data;
};

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

const registerRequest = async (credentials: RegisterInterface) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/Account/Register`, credentials);
  return response.data;
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
