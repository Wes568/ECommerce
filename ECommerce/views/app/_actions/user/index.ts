/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { LoginInterface, RegisterInterface } from '@/app/_types/user';
import { ApiRequisition } from "..";

const req = new ApiRequisition()

export const loginRequest = async (credentials: LoginInterface) => {
  const response = await req.setPayload({
    url: "/Account/Login",
    content: credentials,
    messageSuccess: `Bem-vindo(a) novamente!, ${credentials.userName}`,
    messageError: "Erro ao logar na loja",
  }).post();
  return response;
};


export const registerRequest = async (credentials: RegisterInterface) => {
  const response = await req.setPayload({
    url: "/Account/Register",
    content: credentials,
    messageSuccess: `Bem-vindo!, ${credentials.userName}`,
    messageError: "Erro ao registrar usuário na loja",
  }).post();
  return response;
};

