interface IOrderAttributes {
  userId: string;
  productId: string;
  totalAmount: number;
  createdAt?: Date;
  quantity: number;
  updatedAt?: Date;
}
