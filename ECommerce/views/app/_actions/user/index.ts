import { LoginInterface, RegisterInterface } from '@/app/_types/user';
import { api } from '..';

export const loginRequest = async (credentials: LoginInterface) => {
  try {
    const { data } = await api.post("/Account/Login", credentials)
    return data;
  } catch (error) {
    return error
  }
};

export const registerRequest = async (credentials: RegisterInterface) => {
  try {
    const { data } = await api.put("/Account/Register", credentials)
    return data;
  } catch (error) {
    return error
  }
};

