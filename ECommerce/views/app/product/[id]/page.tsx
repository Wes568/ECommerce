import { getProductDetails } from "@/app/_actions/product";
import ProductPurchase from "../components/product-purchase";

const Home = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const productId = Number(id);
  let response;
  try {
    response = await getProductDetails(productId);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="container mt-[98px] lg:mt-[134px]">
      <ProductPurchase product={response.product} />
    </div>
  );
};

export default Home;
