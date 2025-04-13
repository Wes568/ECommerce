"use server"

import api from "@/app";

export const allProductsRequest = async () => {
  const response = await api.get(`/Produto/Search/?searchString=`);
  return response.data;
};


