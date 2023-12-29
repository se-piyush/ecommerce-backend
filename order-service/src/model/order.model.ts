import { CreationOptional, DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";

class Order extends Model<IOrderAttributes> implements IOrderAttributes {
  declare userId: string;
  declare id: CreationOptional<string>;
  declare productId: number;
  declare totalAmount: number;
  declare quanity: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Order.init(
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quanity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now(),
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

export default Order;
