import { Request, Response } from "express";
import Order from "../model/order.model";
import OrderStatus from "../model/orderStatus.model";
import { getProductQuantityById } from "../services/product.service";
import { makePayment } from "../services/payment.service";
import { OrderStatusEnum } from "../enum";
import Publisher, { Connection } from "../services/publisher.service";

export const createOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { productId, totalAmount, quantity } = req.body; // this would also contain payment info
    const userId = req.userId;
    const productQuanityLeft = await getProductQuantityById(
      productId,
      <string>req.headers.cookie
    );
    if (productQuanityLeft <= 0) {
      return res.status(403).send("not sufficient inventory");
    }
    // call payment service
    await makePayment();

    const order = await Order.create({
      productId,
      userId,
      quantity,
      totalAmount,
    });
    await OrderStatus.create({
      status: OrderStatusEnum.paymentPending,
      OrderId: order.id,
    });
    const publisher = new Publisher();
    const connect = await Connection.getConnection();
    publisher.publish(
      JSON.stringify({ orderId: order.id, productId, quantity }),
      connect,
      "orderStatus"
    );
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

    const order = await Order.findAll({
      where: { userId },
      include: OrderStatus,
    });

    return res.status(201).json(order);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const health = (req: Request, res: Response) => res.status(200).send();

export const ready = (req: Request, res: Response) => {
  // LATER
  // check the db connection
  return res.status(200).send();
};
