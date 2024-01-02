import { Request, Response } from "express";
import {
  updateProductQuantityById,
  getProducts,
  getProductQuantityById,
} from "./product.controller";
import Product from "../model/product.model";

describe("updateProductQuantityById", () => {
  const mockRequest = {
    params: { productId: "1234567890abcdef12345678" },
    body: { quantity: 10 },
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 OK with updated product when product exists and quantity is updated", async () => {
    const mockProduct = { _id: "1234567890abcdef12345678", quantity: 20 };
    jest.spyOn(Product, "findOneAndUpdate").mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(mockProduct),
    } as any);

    await updateProductQuantityById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);
  });

  it("should return 404 Not Found when product does not meet quantity criteria", async () => {
    jest.spyOn(Product, "findOneAndUpdate").mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as any);

    await updateProductQuantityById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Product cannot be updated.",
    });
  });

  it("should return 500 Internal Server Error when an error occurs during product update", async () => {
    jest.spyOn(Product, "findOneAndUpdate").mockReturnValueOnce({
      exec: jest.fn().mockRejectedValueOnce(new Error("Internal Server Error")),
    } as any);

    await updateProductQuantityById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});

describe("getProducts", () => {
  const mockRequest = {
    query: {},
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock implementations before each test
  });

  it("should return 400 Bad Request with invalid filter", async () => {
    mockRequest.query.filter = JSON.stringify({ invalidFilter: "value" });

    await getProducts(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith(
      'only allowed filters are "category","title" and "id"'
    );
  });

  it("should return 404 Not Found when no products found for the specified category", async () => {
    mockRequest.query.filter = JSON.stringify({ category: "invalidCategory" });
    jest.spyOn(Product, "find").mockResolvedValueOnce([]);

    await getProducts(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "No products found for the specified category.",
    });
  });

  it("should return 200 OK with products when products are found", async () => {
    const mockProducts = [
      {
        _id: "1234567890abcdef12345678",
        title: "Product 1",
        category: "Category 1",
      },
    ];
    mockRequest.query.filter = JSON.stringify({ category: "Category 1" });
    jest.spyOn(Product, "find").mockResolvedValueOnce(mockProducts);

    await getProducts(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockProducts);
  });

  it("should return 500 Internal Server Error when an error occurs", async () => {
    mockRequest.query.filter = JSON.stringify({ category: "Category 1" });
    jest
      .spyOn(Product, "find")
      .mockRejectedValueOnce(new Error("Internal Server Error"));

    await getProducts(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});

describe("getProductQuantityById", () => {
  const mockRequest = {
    params: { productId: "1234567890abcdef12345678" },
  } as unknown as Request;

  const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock implementations before each test
  });

  it("should return 200 OK with product quantity when product is found", async () => {
    const mockProduct = { _id: "1234567890abcdef12345678", quantity: 10 };
    jest.spyOn(Product, "findById").mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockProduct),
      }),
    } as any);

    await getProductQuantityById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      quantity: mockProduct.quantity,
    });
  });

  it("should return 404 Not Found when product is not found", async () => {
    jest.spyOn(Product, "findById").mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      }),
    } as any);

    await getProductQuantityById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Product not found.",
    });
  });

  it("should return 500 Internal Server Error when an error occurs", async () => {
    jest.spyOn(Product, "findById").mockReturnValueOnce({
      select: jest.fn().mockReturnValueOnce({
        exec: jest
          .fn()
          .mockRejectedValueOnce(new Error("Internal Server Error")),
      }),
    } as any);

    await getProductQuantityById(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Internal Server Error",
    });
  });
});
