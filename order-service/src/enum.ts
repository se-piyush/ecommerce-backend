export enum OrderStatusEnum {
  paymentPending = "payment pending",
  paymentSuccessfull = "payment successfull",
  paymentFail = "payment failed",
  orderConfirmed = "order confirmed",
  orderOutOfStock = "order out of stock",
}

export enum HttpStatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  FORBIDDEN = 403,
  UN_AUTHENTICATED = 401,
}
