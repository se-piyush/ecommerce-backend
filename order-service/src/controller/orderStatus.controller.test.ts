import { Request, Response } from "express";
import { updateOrderStatus } from "./orderStatus.controller";
import { OrderStatusEnum } from "../enum";
import OrderStatus from "../model/orderStatus.model";

describe("updateOrderStatus", () => {
  const mockRequest = {
    params: { OrderId: "1234567890abcdef12345678" },
    body: { status: OrderStatusEnum.orderConfirmed },
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
  } as unknown as Response;

  afterEach(jest.restoreAllMocks);

  it("should return 201 Created when status is valid and order status is updated", async () => {
    jest.spyOn(OrderStatus, "create").mockResolvedValueOnce({});

    await updateOrderStatus(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it("should return 500 Internal Server Error when an error occurs", async () => {
    jest
      .spyOn(OrderStatus, "create")
      .mockRejectedValueOnce(new Error("Internal Server Error"));

    await updateOrderStatus(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
  });

  it("should return 400 Bad Request when status is invalid", async () => {
    mockRequest.body.status = "INVALID_STATUS";

    await updateOrderStatus(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith("Invalid status");
  });
});
