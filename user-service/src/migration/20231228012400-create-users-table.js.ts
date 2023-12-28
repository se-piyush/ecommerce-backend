import { QueryInterface } from 'sequelize';
import User from '../model/users.model';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', User.getAttributes());
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('users');
  }
};
