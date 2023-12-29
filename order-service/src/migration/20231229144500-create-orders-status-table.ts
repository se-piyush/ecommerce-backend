import { QueryInterface } from "sequelize";
import OrderStatus from "../model/orderStatus.model";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("Order", OrderStatus.getAttributes());
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("Order");
  },
};
