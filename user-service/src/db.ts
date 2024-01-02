import { Sequelize } from "sequelize";

// added this syntax to bypass jest could not resolve database.config.ts' is not a module error
const { development } = require("./config/database.config");

const dbConfigurationObject = development;
const sequelize = new Sequelize(
  dbConfigurationObject.database,
  dbConfigurationObject.username,
  dbConfigurationObject.password,
  {
    host: dbConfigurationObject.host,
    port: dbConfigurationObject.port,
    dialect: dbConfigurationObject.dialect,
  }
);

export default sequelize;
