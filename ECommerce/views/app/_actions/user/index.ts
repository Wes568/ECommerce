"use server";

import { LoginInterface, RegisterInterface } from '@/app/_types/user';
import { api } from '..';
import { cookies } from 'next/headers';

export const loginRequest = async (credentials: LoginInterface) => {
  try {
    const { data } = await api.post("/Account/Login", credentials);
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });

    cookieStore.set("userId", data.user.id, {
      path: "/",
      sameSite: "lax",
    });

    cookieStore.set("username", data.user.userName, {
      path: "/",
      sameSite: "lax",
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const registerRequest = async (credentials: RegisterInterface) => {
  try {
    const { data } = await api.put("/Account/Register", credentials);
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    });

    cookieStore.set("userId", data.user.id, {
      path: "/",
      sameSite: "lax",
    });

    cookieStore.set("username", data.user.userName, {
      path: "/",
      sameSite: "lax",
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const logoutRequest = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("userId");
  cookieStore.delete("username");
}
