"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import api from '@/app';

interface LoginInterface {
  userName: string;
  password: string;
}

interface RegisterInterface {
  userName: string;
  email: string;
  password: string;
}


export const loginRequest = async (credentials: LoginInterface) => {
  const response = await api.post(`/Account/Login`, credentials);
  return response.data;
};


export const registerRequest = async (credentials: RegisterInterface) => {
  const response = await api.post(`/Account/Register`, credentials);
  return response.data;
};

