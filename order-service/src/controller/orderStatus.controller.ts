import { Request, Response } from "express";
import OrderStatus from "../model/orderStatus.model";
import { OrderStatusEnum } from "../enum";

export const updateOrderStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { OrderId } = req.params;
  const status = <string>req.body.status || "";
  try {
    const isValidStatus = !!Object.values(OrderStatusEnum).filter(
      (enumStatus) => enumStatus === status
    ).length;
    if (!isValidStatus) {
      return res.status(400).send("Invalid status");
    }
    await OrderStatus.create({ status, OrderId });
    return res.status(201).send();
  } catch (err: any) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

export const getOrderStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { OrderId } = req.params;
  try {
    const orderStatus = await OrderStatus.findOne({
      where: { OrderId },
      order: [["id", "DESC"]],
    });
    if (orderStatus) {
      return res.status(201).json({ orderStatus });
    } else {
      return res
        .status(404)
        .send(`Order against order id ${OrderId} not found.`);
    }
  } catch (err: any) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};
