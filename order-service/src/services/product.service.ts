import axios from "axios";
const productServiceUrl =
  process.env.PRODUCT_SERVICE || "http://localhost:4000/product";
export const getProductQuantityById = async (
  productId: string,
  cookie: string
) => {
  try {
    const {
      data: { quantity },
    } = await axios.get(`${productServiceUrl}/${productId}/quantity`, {
      headers: { Cookie: cookie },
    });
    return quantity;
  } catch (err) {
    // handle error
    return 0;
  }
};
