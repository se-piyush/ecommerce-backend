import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { OrderStatusEnum } from "../enum";
import Order from "./order.model";

class OrderStatus
  extends Model<IOrderStatusAttributes>
  implements IOrderStatusAttributes
{
  declare status: OrderStatusEnum;
  declare createdAt: Date;
  declare OrderId: string;
}

OrderStatus.init(
  {
    status: {
      type: DataTypes.ENUM(...Object.values(OrderStatusEnum)),
      defaultValue: OrderStatusEnum.paymentPending,
      allowNull: false,
    },
    OrderId: {
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
    tableName: "orderstatus",
  }
);

export default OrderStatus;
