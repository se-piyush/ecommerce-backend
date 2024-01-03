import { Sequelize } from "sequelize";
const { development } = require("./config/database.config");
const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    port: development.port,
    dialect: development.dialect,
  }
);

export default sequelize;
