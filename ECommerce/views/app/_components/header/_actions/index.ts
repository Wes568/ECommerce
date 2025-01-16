/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosError } from "axios";
import { toast } from "sonner"

interface LoginInterface {
  userName: string;
  password: string;
}

interface RegisterInterface {
  userName: string;
  email: string;
  password: string;
}



export const login = async (credentials: LoginInterface, setAuth: (auth: any) => void) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/Account/Login`, credentials);
    setAuth({ username: response.data.user.userName, token: response.data.token });
    localStorage.setItem("token", response.data.token)
    toast.success(`Bem-vindo, ${response.data.user.userName}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error("Nome de usuário ou senha inválidos");
      console.error("Erro ao logar usuário:", error);
    }
  }
};

export const register = async (credentials: RegisterInterface, setAuth: (auth: any) => void) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/Account/Register`, credentials);
    setAuth({ username: response.data.user.userName, token: response.data.token });
    localStorage.setItem("token", response.data.token)
    toast.success(`Bem-vindo, ${response.data.user.userName}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      toast.error("Nome de usuário ou senha inválidos");
      console.error("Erro ao registrar usuário:", error);
    }
  }
};
