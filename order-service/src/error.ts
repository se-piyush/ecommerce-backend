import { HttpStatusCodes } from "./enum";

export default class BaseError extends Error {
  httpCode: number;

  constructor(name: string, httpCode: number, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

export class BadRequestError extends BaseError {
  constructor(description: string) {
    super("BadREquest Error", HttpStatusCodes.BAD_REQUEST, description);
  }
}

export class resourceNotFoundError extends BaseError {
  constructor(description: string) {
    super("resource not found Error", HttpStatusCodes.NOT_FOUND, description);
  }
}

export class ForbiddenError extends BaseError {
  constructor(description: string) {
    super("Forbidden Error", HttpStatusCodes.FORBIDDEN, description);
  }
}

export class UnauthenticatedError extends BaseError {
  constructor(description: string) {
    super(
      "UnAuthenticated Error ",
      HttpStatusCodes.UN_AUTHENTICATED,
      description
    );
  }
}

export class InternalServerError extends BaseError {
  constructor(description: string) {
    super(
      "Internal Server Error",
      HttpStatusCodes.INTERNAL_SERVER,
      description
    );
  }
}
