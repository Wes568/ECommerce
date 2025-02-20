"use server"

import api from "@/app";

export const allProductsRequest = async () => {
  const response = await api.get(`${process.env.NEXT_PUBLIC_APP_URL}/Produto/Search/?searchString=`);
  return response.data;
};


