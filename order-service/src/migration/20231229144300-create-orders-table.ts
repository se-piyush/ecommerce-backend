import { QueryInterface } from "sequelize";
import Order from "../model/order.model";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable("order", Order.getAttributes());
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable("order");
  },
};
