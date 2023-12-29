import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";
import { OrderStatusEnum } from "../enum";
import Order from "./order.model";

class OrderStatus
  extends Model<IOrderStatusAttributes>
  implements IOrderStatusAttributes
{
  declare status: OrderStatusEnum;
  declare createdAt: Date;
  declare orderId: string;
}

OrderStatus.init(
  {
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatusEnum)),
      defaultValue: OrderStatusEnum.paymentPending,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
  },
  {
    sequelize,
    modelName: "OrderStatus",
  }
);

export default OrderStatus;
