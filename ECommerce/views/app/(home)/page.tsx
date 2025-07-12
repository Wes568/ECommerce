import { allProductsRequest } from "../_actions/product";
import ProductsHome from "./components/products-home";

const Home = async () => {
  const response = await allProductsRequest();

  return (
    <section>
      <ProductsHome products={response.products} />
    </section>
  );
};

export default Home;
