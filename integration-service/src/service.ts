import axios from "axios";

const productServiceUrl =
  process.env.PRODUCT_SERVICE || "http://localhost:4000";

const orderServiceUrl = process.env.ORDER_SERVICE || "http://localhost:5000";

export const updateProductQuantity = async (
  productId: string,
  quantity: number
) => {
  await axios.put(
    `${productServiceUrl}/internal/product/${productId}/quantity`,
    { quantity }
  );
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  await axios.put(`${orderServiceUrl}/internal/orders/${orderId}/status`, {
    status,
  });
};
