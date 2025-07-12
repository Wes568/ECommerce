import { cookies } from "next/headers";
import { getProductsByUserRequest } from "../_actions/product";
import ProductsManagement from "./components/products-management";

const ProductManagement = async () => {
  const cookieStore = cookies();
  const userId = (await cookieStore).get("userId")?.value;
  let response;
  if (userId) {
    response = await getProductsByUserRequest(userId);
  }
  return (
    <section>
      <ProductsManagement userProducts={response.products} />
    </section>
  );
};

export default ProductManagement;
