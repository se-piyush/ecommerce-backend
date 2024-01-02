import { Sequelize } from "sequelize";
import dbConfig from "./config/database.config";
const dbConfigurationObject = dbConfig.development;
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
