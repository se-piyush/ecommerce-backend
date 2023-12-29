import { Request, Response } from "express";
import OrderStatus from "../model/orderStatus.model";
import { OrderStatusEnum } from "../enum";

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { orderId } = req.params;
  const status = <string>req.query.status || "";
  const isValidStatus = !!Object.values(OrderStatusEnum).filter(
    (enumStatus) => enumStatus !== status
  ).length;
  if (!isValidStatus) {
    return res.status(400).send("Invalid status");
  }
  await OrderStatus.create({ status, orderId });
  return res.status(201).send();
};

export const getOrderStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { orderId } = req.params;
  const orderStatus = await OrderStatus.findOne({ where: { orderId } });
  if (orderStatus) {
    return res.status(201).json({ orderStatus });
  } else {
    return res.status(404).send(`Order against order id ${orderId} not found.`);
  }
};
