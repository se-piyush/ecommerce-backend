import { QueryInterface } from "sequelize";
import OrderStatus from "../model/orderStatus.model";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable(
      "orderstatus",
      OrderStatus.getAttributes()
    );
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("orderstatus");
  },
};
