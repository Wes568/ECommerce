"use server"

import { IProduct } from "@/app/_types/product";
import { api } from "..";
import { revalidatePath } from "next/cache";


export const allProductsRequest = async () => {
  try {
    const { data } = await api.get("/Produto/Search/?searchString=")
    return data;
  } catch (error) {
    return error
  }
};

export const getProductsByUserRequest = async (userId: string | null) => {
  try {
    const { data } = await api.get(`/Produto/ListProductsByUser/?userId=${userId}`)
    return data;
  } catch (error) {
    return error
  }
}

export const getProductDetails = async (productId: number) => {
  try {
    const { data } = await api.get(`/Produto/Details/?productId=${productId}`)
    return data;
  } catch (error) {
    return error
  }
}

export const upsertProductRequest = async (product: IProduct) => {
  let response;
  try {
    if (product.produtoId) {
      response = await api.put("/Produto/Update/", product)
    } else {
      response = await api.post("/Produto/Register", product)
    }
    revalidatePath("/product-management")
    return response.data;
  } catch (error) {
    return error
  }
}

export const deleteProductRequest = async (productId: string) => {
  try {
    const { data } = await api.delete(`/Produto/Delete/?productId=${productId}`)
    revalidatePath("/product-management")
    return data
  } catch (error) {
    return error
  }
}
