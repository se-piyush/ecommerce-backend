import { Request, Response } from "express";
import { verify } from "./user.controller";
import token from "../utils/token";
import User from "../model/users.model";

describe("verify", () => {
  const mockRequest = {
    query: { userJwtToken: "token" },
  } as unknown as Request;
  const mockResponse = {
    status: jest.fn(() => mockResponse),
    send: jest.fn(),
  } as unknown as Response;

  afterEach(jest.restoreAllMocks);

  it("should return 200 OK with user ID when user exists", async () => {
    const mockDecodedUser = { id: 1 };
    jest.spyOn(token, "verifyToken").mockReturnValue(mockDecodedUser);
    jest.spyOn(User, "findByPk").mockResolvedValue({ id: 1 } as any);

    await verify(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith({ userId: 1 });
  });

  it("should return 401 Unauthorized when user does not exist", async () => {
    jest.spyOn(token, "verifyToken").mockReturnValue({ id: 1 });
    jest.spyOn(User, "findByPk").mockResolvedValue(null);

    await verify(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it("should return 401 Unauthorized when token verification fails", async () => {
    jest.spyOn(token, "verifyToken").mockImplementation(() => {
      throw new Error("Token verification failed");
    });

    await verify(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalled();
  });
});
