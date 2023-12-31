import axios from "axios";
const productServiceUrl =
  process.env.PRODUCT_SERVICE || "http://localhost:4000";
export const getProductQuantityById = async (
  productId: string,
  cookie: string
) => {
  console.log(`${productServiceUrl}/product/${productId}/quantity`);
  try {
    const {
      data: { quantity },
    } = await axios.get(`${productServiceUrl}/product/${productId}/quantity`, {
      headers: { Cookie: cookie },
    });
    return quantity;
  } catch (err) {
    console.log(err);
    return 0;
  }
};
