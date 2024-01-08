import { CreationOptional, DataTypes, Model } from "sequelize";
import sequelize from "../db";

class Order extends Model<IOrderAttributes> implements IOrderAttributes {
  declare userId: string;
  declare id: CreationOptional<string>;
  declare productId: string;
  declare totalAmount: number;
  declare quantity: number;
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
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
    tableName: "order",
  }
);

export default Order;
