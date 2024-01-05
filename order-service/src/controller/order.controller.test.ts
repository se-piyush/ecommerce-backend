import Order from "../model/order.model";
import * as productService from "../services/product.service";
import * as paymentService from "../services/payment.service";
import * as Publisher from "../services/publisher.service";
import OrderStatus from "../model/orderStatus.model";
import { createOrder } from "./order.controller";
import { Request, Response } from "express";

describe("createOrder", () => {
  const mockRequest = {
    body: {
      productId: "product123",
      totalAmount: 100,
      quantity: 2,
    },
    userId: "user123",
    headers: {
      cookie: "your-cookie-value",
    },
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
    send: jest.fn(),
  } as unknown as Response;

  const mockQuanity = 10;

  afterEach(jest.restoreAllMocks);

  // it("should create order and return 201 status if inventory is sufficient and payment is successful", async () => {
  //   jest
  //     .spyOn(Order, "create")
  //     .mockResolvedValueOnce({ id: "order123", ...mockRequest.body });
  //   jest.spyOn(OrderStatus, "create").mockResolvedValueOnce({});
  //   jest
  //     .spyOn(productService, "getProductQuantityById")
  //     .mockResolvedValueOnce(mockQuanity);

  //   jest.spyOn(paymentService, "makePayment").mockResolvedValueOnce();
  //   jest
  //     .spyOn(Publisher, "default")
  //     .mockReturnValueOnce({ publish: jest.fn().mockImplementation() });
  //   jest.spyOn(Publisher.Connection, "getConnection");

  //   await createOrder(mockRequest, mockResponse);

  //   expect(mockResponse.status).toHaveBeenCalledWith(201);
  //   expect(mockResponse.json).toHaveBeenCalledWith(
  //     expect.objectContaining({ id: "order123" })
  //   );
  // });

  it("should return 403 status if inventory is insufficient", async () => {
    jest
      .spyOn(productService, "getProductQuantityById")
      .mockResolvedValueOnce(0);

    await createOrder(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.send).toHaveBeenCalledWith("not sufficient inventory");
  });

  it("should return 500 status if payment fails", async () => {
    jest
      .spyOn(productService, "getProductQuantityById")
      .mockResolvedValueOnce(mockQuanity);
    jest
      .spyOn(paymentService, "makePayment")
      .mockRejectedValueOnce(new Error("Payment Failed"));

    await createOrder(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Payment Failed" });
  });
});
