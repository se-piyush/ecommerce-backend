interface IOrderAttributes {
  userId: string;
  productId: number;
  totalAmount: number;
  createdAt?: Date;
  quantity: number;
  updatedAt?: Date;
}
