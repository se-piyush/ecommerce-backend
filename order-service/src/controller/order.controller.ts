import { Request, Response } from "express";
import Order from "../model/order.model";
import OrderStatus from "../model/orderStatus.model";
import { getProductQuantityById } from "../services/product.service";
import { makePayment } from "../services/payment.service";
import { OrderStatusEnum } from "../enum";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { productId, totalAmount, quanity } = req.body; // this would also contain payment info
    const userId = req.userId;
    const productQuanityLeft = await getProductQuantityById(productId);
    if (productQuanityLeft > 0) {
      return res.status(403).send("not sufficient inventory");
    }
    // call payment service
    await makePayment();

    const order = await Order.create({
      productId,
      userId,
      quanity,
      totalAmount,
    });
    await OrderStatus.create({
      status: OrderStatusEnum.paymentPending,
      orderId: order.id,
    });
    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.userId;

    // call payment service
    await makePayment();

    const order = await Order.findAll({ include: Order, where: { userId } });

    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
