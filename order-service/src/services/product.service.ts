import axios from "axios";
const productServiceUrl = "https://localhost:4000/product";
export const getProductQuantityById = async (productId: string) => {
  try {
    const {
      data: { quantity },
    } = await axios.get(`${productServiceUrl}/${productId}/quantity`);
    return quantity;
  } catch (err) {
    // handle error
    return 0;
  }
};
